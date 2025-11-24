import globalAxios from 'axios'
import * as killbill from 'killbill'
import { env } from '~/env'

const axios = globalAxios.create()

const KILLBILL_API_KEY = env.KILLBILL_API_KEY
const KILLBILL_API_SECRET = env.KILLBILL_API_SECRET
const KILLBILL_URL = env.KILLBILL_URL
const KILLBILL_USERNAME = env.KILLBILL_USERNAME
const KILLBILL_PASSWORD = env.KILLBILL_PASSWORD

if (
  !KILLBILL_API_KEY ||
  !KILLBILL_API_SECRET ||
  !KILLBILL_URL ||
  !KILLBILL_USERNAME ||
  !KILLBILL_PASSWORD
) {
  throw new Error('KillBill environment variables are not set properly')
}

const config = new killbill.Configuration({
  basePath: KILLBILL_URL,
  username: KILLBILL_USERNAME,
  password: KILLBILL_PASSWORD,
  apiKey: killbill.apiKey(KILLBILL_API_KEY, KILLBILL_API_SECRET),
})

const killBillAccountApi = new killbill.AccountApi(config, KILLBILL_URL, axios)
const killBillSubscriptionApi = new killbill.SubscriptionApi(
  config,
  KILLBILL_URL,
  axios,
)

export enum PRODUCTS {
  'premium-monthly' = 'Premium',
}

export type TPlanId = keyof typeof PRODUCTS

export type SubscriptionStatus = {
  hasActiveSubscription: boolean
  baseTier: 'free' | 'premium'
  activeAddons: string[]
  isTrialActive: boolean
  trialEndsAt?: string
  features: {
    hasPremium: boolean
  }
  subscriptions?: Array<{
    subscriptionId: string
    productName: string
    state: string
    phaseType?: string | undefined
  }>
}

export type KBAccount = {
  accountId: string
  externalKey: string
  name: string
  email: string
}

// KillBill Client
class KillBillClient {
  private auditData = {
    user: 'arc-aide-system',
    reason: 'New subscription',
    comment: 'Triggered by Arc-Aide',
  }

  // Create KB Account
  async createKbAccount(
    externalKey: string,
    name: string,
    email: string,
  ): Promise<KBAccount> {
    try {
      const accountData: killbill.Account = {
        name,
        email,
        externalKey,
        currency: 'GBP',
      }

      const response = await killBillAccountApi.createAccount(
        accountData,
        this.auditData.user,
        this.auditData.reason,
        this.auditData.comment,
      )

      if (!response.data || !response.data.accountId) {
        throw new Error('Invalid response from KillBill account creation')
      }

      return {
        accountId: response.data.accountId!,
        externalKey: response.data.externalKey!,
        name: response.data.name!,
        email: response.data.email!,
      }
    } catch (error) {
      console.error('Error creating KillBill account:', error)
      throw error
    }
  }

  // Find account by external key
  async findAccountByExternalKey(
    externalKey: string,
  ): Promise<KBAccount | null> {
    try {
      const response = await killBillAccountApi.getAccountByKey(externalKey)

      return {
        accountId: response.data.accountId!,
        externalKey: response.data.externalKey!,
        name: response.data.name!,
        email: response.data.email!,
      }
    } catch (error) {
      if (globalAxios.isAxiosError(error) && error.response?.status === 404) {
        return null // Account not found
      }
      console.error('Error in findAccountByExternalKey:', error)
      return null
    }
  }

  // Find or create account
  async findOrCreateAccount(
    externalKey: string,
    name: string,
    email: string,
  ): Promise<KBAccount> {
    const existing = await this.findAccountByExternalKey(externalKey)
    if (existing) return existing
    return this.createKbAccount(externalKey, name, email)
  }

  // Create Stripe session
  async createSession(accountId: string, successUrl: string): Promise<string> {
    if (!KILLBILL_URL || !KILLBILL_USERNAME || !KILLBILL_PASSWORD) {
      throw new Error('KillBill environment variables are not set properly')
    }

    if (!accountId) {
      throw new Error('Account ID is required for creating a session')
    }

    try {
      const pluginEndpoint = `${KILLBILL_URL}/plugins/killbill-stripe/checkout`

      const requestData = {
        kbAccountId: accountId,
        successUrl: successUrl,
        cancelUrl: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/settings`,
      }

      const response = await axios.post(pluginEndpoint, null, {
        params: requestData,
        auth: {
          username: KILLBILL_USERNAME,
          password: KILLBILL_PASSWORD,
        },
        headers: {
          'X-Killbill-ApiKey': KILLBILL_API_KEY,
          'X-Killbill-ApiSecret': KILLBILL_API_SECRET,
          'Content-Type': 'application/json',
        },
      })

      // Extract session ID from response (following Ruby example)
      const formFields = response.data.formFields || []
      const sessionIdField = formFields.find(
        (field: { key: string; value: string }) => field.key === 'id',
      )

      if (!sessionIdField) {
        throw new Error('No session ID returned from KillBill Stripe plugin')
      }

      return sessionIdField.value
    } catch (error) {
      console.error('Error creating session via KillBill:', error)
      throw error
    }
  }

  // Create payment method
  async createKbPaymentMethod(
    accountId: string,
    sessionId?: string,
    token?: string,
  ): Promise<killbill.PaymentMethod> {
    const paymentMethodData: killbill.PaymentMethod = {
      accountId,
      pluginName: 'killbill-stripe',
    }

    // Create plugin properties for Stripe
    const pluginProperties: string[] = []
    if (token) {
      pluginProperties.push(`token=${token}`)
    } else if (sessionId) {
      pluginProperties.push(`sessionId=${sessionId}`)
    }

    const response = await killBillAccountApi.createPaymentMethod(
      paymentMethodData,
      accountId,
      this.auditData.user,
      true, // isDefault
      false, // payAllUnpaidInvoices
      undefined, // controlPluginName
      pluginProperties,
    )

    return response.data
  }

  // Create subscription
  async createSubscription(
    accountId: string,
    productId: string = 'premium-monthly',
  ): Promise<killbill.Subscription> {
    const productName =
      PRODUCTS[productId as keyof typeof PRODUCTS] || 'Premium'

    // This cast is necessary because TypeScript expects both productName and planName to be defined, but that causes "400: message: 'SubscriptionJson productName should not be set when planName is specified'"
    const subscriptionData = {
      accountId,
      productName,
      productCategory: 'BASE',
      billingPeriod: 'MONTHLY',
      priceList: 'DEFAULT',
      // priceOverrides: [...]
    } as killbill.Subscription

    const response = await killBillSubscriptionApi.createSubscription(
      subscriptionData,
      this.auditData.user,
      undefined, // entitlementDate
      undefined, // billingDate
      undefined, // renameKeyIfExistsAndUnused
      undefined, // migrated
      undefined, // skipResponse
      true, // callCompletion
      20, // callTimeoutSec
    )

    return response.data
  }

  // Add add-on to existing subscription
  async addAddonToSubscription(
    accountId: string,
    addonProductId: TPlanId,
  ): Promise<killbill.Subscription> {
    // First, get the account's bundles to find the base subscription
    const bundlesResponse =
      await killBillAccountApi.getAccountBundles(accountId)

    if (!bundlesResponse.data || bundlesResponse.data.length === 0) {
      throw new Error('No bundles found for account')
    }

    // Find the bundle with the base subscription (Premium)
    let baseBundleId: string | undefined
    for (const bundle of bundlesResponse.data) {
      if (bundle.subscriptions) {
        for (const sub of bundle.subscriptions) {
          if (
            sub.productName?.toLowerCase().includes('premium') &&
            sub.state === 'ACTIVE'
          ) {
            baseBundleId = bundle.bundleId
            break
          }
        }
      }
      if (baseBundleId) break
    }

    if (!baseBundleId) {
      throw new Error('No active Premium subscription found')
    }

    const productName =
      PRODUCTS[addonProductId as keyof typeof PRODUCTS] || 'AI'

    // Create add-on subscription with both accountId and bundleId
    const addOnData = {
      accountId,
      bundleId: baseBundleId,
      productName,
      productCategory: 'ADD_ON',
      billingPeriod: 'MONTHLY',
      priceList: 'DEFAULT',
    } as killbill.Subscription

    const response = await killBillSubscriptionApi.createSubscription(
      addOnData,
      this.auditData.user,
      undefined, // entitlementDate
      undefined, // billingDate
      undefined, // renameKeyIfExistsAndUnused
      undefined, // migrated
      undefined, // skipResponse
      true, // callCompletion
      20, // callTimeoutSec
    )

    return response.data
  }

  // Cancel subscription by subscription ID
  private async cancelSubscription(subscriptionId: string) {
    await killBillSubscriptionApi.cancelSubscriptionPlan(
      subscriptionId,
      this.auditData.user,
      undefined, // requestedDate
      true, // callCompletion
      20, // callTimeoutSec
      'IMMEDIATE', // entitlementPolicy
      'IMMEDIATE', // billingPolicy
      undefined, // useRequestedDateForBilling
      undefined, // pluginProperty
      this.auditData.reason, // xKillbillReason
      this.auditData.comment, // xKillbillComment
    )
  }

  // Cancel specific add-on subscription
  async cancelSubscriptionByType(userExternalKey: string, planId: TPlanId) {
    const account = await this.findAccountByExternalKey(userExternalKey)
    if (!account) {
      throw new Error('Account not found')
    }

    const bundlesResponse = await killBillAccountApi.getAccountBundles(
      account.accountId,
    )
    const productName = PRODUCTS[planId as keyof typeof PRODUCTS]

    for (const bundle of bundlesResponse.data) {
      if (bundle.subscriptions) {
        for (const sub of bundle.subscriptions) {
          if (
            sub.state === 'ACTIVE' &&
            sub.productName
              ?.toLowerCase()
              .includes(productName.toLowerCase()) &&
            sub.subscriptionId
          ) {
            await this.cancelSubscription(sub.subscriptionId)
            return
          }
        }
      }
    }

    throw new Error(`No active ${productName} subscription found`)
  }

  // Complete charge process
  async charge(
    accountId: string,
    sessionId?: string,
    token?: string,
  ): Promise<{
    invoice: killbill.Invoice
    paymentMethod: killbill.PaymentMethod
    subscription: killbill.Subscription
  }> {
    // Add a payment method associated with the Stripe token/session
    const paymentMethod = await this.createKbPaymentMethod(
      accountId,
      sessionId,
      token,
    )

    // Add a subscription
    const subscription = await this.createSubscription(accountId)

    // Get the invoice
    const invoicesResponse =
      await killBillAccountApi.getInvoicesForAccount(accountId)
    const invoice = invoicesResponse.data[0] // Most recent invoice

    if (!invoice) {
      throw new Error('No invoice generated for the charge')
    }

    return { invoice, paymentMethod, subscription }
  }

  // Get subscription status
  async getSubscriptionStatus(
    userExternalKey: string,
  ): Promise<SubscriptionStatus> {
    try {
      const account = await this.findAccountByExternalKey(userExternalKey)
      if (!account) {
        return this.getDefaultSubscriptionStatus()
      }

      const bundlesResponse = await killBillAccountApi.getAccountBundles(
        account.accountId,
      )
      const subscriptions: killbill.Subscription[] = []

      for (const bundle of bundlesResponse.data) {
        if (bundle.subscriptions) {
          subscriptions.push(...bundle.subscriptions)
        }
      }

      const activeSubscriptions = subscriptions.filter(
        (sub) => sub.state === 'ACTIVE',
      )
      const hasActiveSubscription = activeSubscriptions.length > 0

      // Determine features based on subscriptions
      let baseTier: 'free' | 'premium' = 'free'
      const activeAddons: string[] = []
      let isTrialActive = false

      for (const sub of activeSubscriptions) {
        if (sub.productName?.toLowerCase().includes('premium')) {
          baseTier = 'premium'
        }
        if (sub.phaseType === 'TRIAL') {
          isTrialActive = true
        }
      }

      return {
        hasActiveSubscription,
        baseTier,
        activeAddons,
        isTrialActive,
        features: {
          hasPremium: baseTier === 'premium',
        },
        subscriptions: activeSubscriptions.map((sub) => ({
          subscriptionId: sub.subscriptionId!,
          productName: sub.productName || 'Unknown',
          state: sub.state!,
          phaseType: sub.phaseType,
        })),
      }
    } catch (error) {
      console.error('Error getting subscription status:', error)
      return this.getDefaultSubscriptionStatus()
    }
  }

  private getDefaultSubscriptionStatus(): SubscriptionStatus {
    return {
      hasActiveSubscription: false,
      baseTier: 'free',
      activeAddons: [],
      isTrialActive: false,
      features: {
        hasPremium: false,
      },
    }
  }
}

// Export singleton instance
export const killBillClient = new KillBillClient()

// Export APIs for direct use if needed
export { killBillAccountApi, killBillSubscriptionApi }
