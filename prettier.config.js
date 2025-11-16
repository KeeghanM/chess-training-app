const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  semi: false,
  singleQuote: true,
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '^@server/(.*)$',
    '^@db/(.*)$',
    '^@auth/(.*)$',
    '^@components/(.*)$',
    '^@hooks/(.*)$',
    '^@stores/(.*)$',
    '^@utils/(.*)$',
    '^[./]', // Other imports
    '<TYPE>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
