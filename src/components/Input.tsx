import { createStyles, rem, Textarea } from '@mantine/core'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  id: string
  label: string
  textarea?: boolean
  error?: boolean
}

const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    color: theme.fn.lighten(theme.colors.gray[9], 0.2),
  },
  input: {
    borderRadius: theme.radius.sm,
    color: theme.fn.lighten(theme.colors.gray[9], 0.6),
    outline: '1px solid transparent',
    border: `1px solid ${theme.fn.darken(theme.fn.themeColor('blue.4'), 0.1)}`,
    paddingTop: rem(4),
    paddingBottom: rem(4),
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    transition: 'border .2s',
    backgroundColor: theme.colors.cyan[7],
    ':focus': {
      border: `1px solid ${theme.fn.themeColor('blue.5')}`,
    },
  },
  error: {
    border: `1px solid ${theme.fn.themeColor('red.6')}`,
    backgroundColor: theme.fn.rgba(theme.colors.red[0], 0.5),
    ':focus': {
      border: `1px solid ${theme.fn.themeColor('red.7')}`,
    },
  },
}))

export function Input({ id, label, className, textarea = false, error, ...props }: InputProps) {
  const { classes, cx } = useStyles()

  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <Textarea
          id={id}
          autosize
          maxRows={4}
          minRows={2}
          classNames={{ input: cx(classes.input, className) }}
          {...props}
        />
      ) : (
        <input className={cx(classes.input, className, { [classes.error]: error })} id={id} {...props} />
      )}
    </div>
  )
}
