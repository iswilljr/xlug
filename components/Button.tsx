import {
  rem,
  createStyles,
  UnstyledButton,
  createPolymorphicComponent,
  type MantineColor,
  type UnstyledButtonProps,
} from "@mantine/core";

interface ButtonParams {
  color?: MantineColor;
  size?: number;
}

interface ButtonProps
  extends ButtonParams,
    UnstyledButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {}

const useStyles = createStyles((theme, { color = "blue.7", size }: ButtonParams) => ({
  button: {
    color: "#ededed",
    borderRadius: theme.radius.sm,
    paddingTop: rem(4),
    paddingBottom: rem(4),
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    textAlign: "center",
    fontSize: size ?? theme.fontSizes.xs,
    lineHeight: "1rem",
    outline: "2px solid transparent",
    outlineOffset: 2,
    outlineWidth: 0,
    transitionProperty: "all",
    transitionDuration: ".2s",
    transitionTimingFunction: "cubic-bezier(0,0,.2,1)",
    display: "block",
    backgroundColor: theme.fn.themeColor(color),
    boxShadow: theme.other.getBoxShadow(theme, theme.fn.lighten(theme.fn.themeColor(color), 0.2)),
    ":hover": {
      backgroundColor: theme.fn.lighten(theme.fn.themeColor(color), 0.1),
      boxShadow: theme.other.getBoxShadow(theme, theme.fn.lighten(theme.fn.themeColor(color), 0.4)),
    },
  },
}));

export function _Button({ color, size, className, ...props }: ButtonProps) {
  const { classes, cx } = useStyles({ color, size });

  return <UnstyledButton className={cx(classes.button, className)} {...props} />;
}

export const Button = createPolymorphicComponent<"button", ButtonProps>(_Button);
