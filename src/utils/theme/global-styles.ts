import type { CSSObject, MantineTheme } from '@mantine/core'

export const globalStyles = (theme: MantineTheme): CSSObject => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  ':root': {
    '--background': '#00060d',
    '--color': '#ededed',
  },
  html: {
    colorScheme: 'dark',
    color: 'var(--color)',
    lineHeight: 'inherit',
  },
  body: {
    backgroundColor: 'var(--background)',
    overflowX: 'hidden',
  },
  '[data-sonner-toast]': {
    [theme.fn.smallerThan(600)]: {
      width: 'calc(100% - 32px) !important',
    },
  },
})
