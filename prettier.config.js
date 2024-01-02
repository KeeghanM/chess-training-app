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
    '^~/server/(.*)$', // Imports by "~/server"
    '<THIRD_PARTY_MODULES>', // Imports by third-party modules
    '^(.*)components/(.*)$', // Imports by "components"
    '^(.*)_util/(.*)$', // Imports by "utils"
    '^[./]', // Other imports
    '<TYPE>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
