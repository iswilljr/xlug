import { colors } from './colors'
import { globalStyles } from './global-styles'
import { other } from './other'
import type { MantineThemeOverride } from '@mantine/core'
import { components } from './components'

export const theme: MantineThemeOverride = {
  other,
  colors,
  components,
  globalStyles,
  primaryShade: 7,
  primaryColor: 'blue',
  colorScheme: 'dark',
}
