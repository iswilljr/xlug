/* eslint-disable react-hooks/rules-of-hooks */
import {
  rem,
  createStyles,
  createPolymorphicComponent,
  type MantineColor,
  type ButtonProps,
  Button,
} from '@mantine/core'

interface ButtonParams {
  color?: MantineColor
}

interface _ButtonProps
  extends ButtonParams,
    ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export const useStyles = createStyles((theme, { color = 'blue.7' }: ButtonParams) => ({
  root: {
    color: '#ededed',
    textDecoration: 'none',
    border: 0,
    borderRadius: theme.radius.sm,
    paddingTop: rem(4),
    paddingBottom: rem(4),
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    textAlign: 'center',
    lineHeight: '1rem',
    outline: '2px solid transparent',
    outlineOffset: 2,
    outlineWidth: 0,
    transitionProperty: 'all',
    transitionDuration: '.2s',
    transitionTimingFunction: 'cubic-bezier(0,0,.2,1)',
    backgroundColor: theme.fn.themeColor(color),
    boxShadow: theme.other.getBoxShadow(theme, theme.fn.lighten(theme.fn.themeColor(color), 0.2)),
    ':not([data-disabled], :disabled):hover': {
      backgroundColor: theme.fn.lighten(theme.fn.themeColor(color), 0.1),
      boxShadow: theme.other.getBoxShadow(theme, theme.fn.lighten(theme.fn.themeColor(color), 0.4)),
    },
    ':disabled, [data-disabled]': {
      color: 'var(--color)',
      backgroundColor: theme.fn.darken(theme.fn.themeColor(color), 0.1),
    },
  },
  leftIcon: { marginRight: 4 },
  rightIcon: { marginLeft: 4 },
}))

export function _Button({ color, size, ...props }: _ButtonProps) {
  const { classes } = useStyles({ color })

  return <Button h='auto' size={size ?? 'md'} classNames={classes} {...props} />
}

const PolymorphicButton = createPolymorphicComponent<'button', ButtonProps>(_Button)

export { PolymorphicButton as Button }
