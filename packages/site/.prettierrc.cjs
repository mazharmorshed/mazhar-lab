module.exports = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSameLine: false,
  endOfLine: 'lf',
  astroAllowShorthand: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
