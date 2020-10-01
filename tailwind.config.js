const { inset, zIndex } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          'disabled': 'rgba(72,159,248,0.4)',
          '100': '#E7EEFB',
          '400': '#489FF8',
          '500': '#3574B5',
          '700': '#2B6CB0',
          '800': '#2C5282',
          '900': '#004D80',
        },
        green: {
          '100': '#A3EECE',
          '200': '#95D9BC',
          '500': '#48BB78',
          '600': '#38A169',
          '700': '#2F855A',
        },
      },
      fontFamily: {
        'sans': ['Source Sans Pro']
      },
      minWidth: {
        '40': '10rem'
      },
      inset: {
        ...inset,
        '16': '4rem!important'
      },
      zIndex: {
        ...zIndex,
        '100': '100'
      }
    }
  },
  variants: {},
  plugins: []
}
