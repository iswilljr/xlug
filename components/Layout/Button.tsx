import Link from "next/link";
import { UnstyledButton, Tooltip, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme, { hide }: { hide?: boolean }) => ({
  control: {
    ...theme.fn.focusStyles(),
    width: 34,
    height: 34,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[0],
    },
    [theme.fn.smallerThan("xs")]: {
      display: hide ? "none" : "inline-flex",
    },
  },
}));

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  hide?: boolean;
  link?: string;
  tooltip: string;
}

export function Button({ className, link, tooltip, hide, ...props }: ButtonProps) {
  const { classes, theme } = useStyles({ hide });
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Tooltip
      label={tooltip}
      disabled={isMobile}
      className={className}
      transitionDuration={0}
      openDelay={500}
      position="bottom"
    >
      {link ? (
        <Link href={link}>
          <a className={classes.control} {...(props as any)} />
        </Link>
      ) : (
        <UnstyledButton className={classes.control} {...props} />
      )}
    </Tooltip>
  );
}
