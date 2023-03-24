import { type MantineColor, UnstyledButton, type UnstyledButtonProps, createStyles, rem } from "@mantine/core";

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
    borderRadius: theme.radius.xs,
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
    boxShadow: `${theme.colors.dark[0]} 0 0 0 0,${theme.colors.dark[0]} 0 0 0 0,${
      theme.colors.dark[7]
    } 0 1px 1px 0,${theme.fn.lighten(theme.fn.themeColor(color), 0.2)} 0 0 0 1px,${theme.colors.dark[0]} 0 0 0 0,${
      theme.colors.dark[0]
    } 0 0 0 0,rgb(64 68 82/8%) 0 2px 5px 0`,
    ":hover": {
      backgroundColor: theme.fn.lighten(theme.fn.themeColor(color), 0.1),
    },
  },
}));

export function Button({ color, size, className, ...props }: ButtonProps) {
  const { classes, cx } = useStyles({ color, size });

  return <UnstyledButton className={cx(classes.button, className)} {...props} />;
}
