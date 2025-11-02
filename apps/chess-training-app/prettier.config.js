const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  semi: false,
  singleQuote: true,
  importOrder: [
    '^(next/(.*)$)|^(next$)', // Imports by "next"
    '^(react/(.*)$)|^(react$)', // Imports by "react"
    '<THIRD_PARTY_MODULES>', // Imports by third-party modules
    '^~/server/(.*)$', // Imports by "~/server"
    '^~/db/(.*)$', // Imports by "~/db"
    '^~/auth/(.*)$', // Imports by "~/auth"
    '^~/components/(.*)$', // Imports by "~/components"
    '^~/hooks/(.*)$', // Imports by "~/hooks"
    '^~/stores/(.*)$', // Imports by "~/stores"
    '^~/utils/(.*)$', // Imports by "~/utils"
    '^[./]', // Other imports
    '<TYPE>',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
}

export default config
