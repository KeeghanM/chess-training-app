import { getPostHogServer } from '@server/posthog-server'

const posthog = getPostHogServer()

/**
 * Base error handler class with error codes, HTTP status, and structured context
 */
export class ErrorHandler extends Error {
  readonly errCode: string
  readonly status: number
  readonly context: Record<string, unknown> = {}

  constructor(
    errCode: string,
    errMessage: string,
    status: number,
    context: Record<string, unknown> = {},
  ) {
    super(errMessage)
    this.errCode = errCode
    this.status = status
    this.context = context

    // Log to PostHog with error code in message
    posthog.captureException(new Error(`[${errCode}] ${errMessage}`))
  }
}

// 400 Range Errors

export class BadRequest extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('BAD_REQUEST', errMessage, 400, context)
  }
}

export class Unauthorized extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('UNAUTHORIZED', errMessage, 401, context)
  }
}

export class Forbidden extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('FORBIDDEN', errMessage, 403, context)
  }
}

export class NotFound extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('NOT_FOUND', errMessage, 404, context)
  }
}

export class TooManyRequests extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('TOO_MANY_REQUESTS', errMessage, 429, context)
  }
}

// 500 Range Errors

export class InternalError extends ErrorHandler {
  constructor(errMessage: string, context: Record<string, unknown> = {}) {
    super('INTERNAL_ERROR', errMessage, 500, context)
  }
}
