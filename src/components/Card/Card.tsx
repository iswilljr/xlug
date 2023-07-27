/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Anchor, Flex, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Card.styles";
import { ActionCopy, type ActionCopyProps } from "./Actions/Copy";
import { ActionEdit, type ActionEditProps } from "./Actions/Edit";
import { ActionDelete, type ActionDeleteProps } from "./Actions/Delete";
import type { Xlug } from "@/types";

export type Action = "copy" | "delete" | "edit";

export interface CardProps {
  actions: Action[];
  data: Xlug;
  layout: "list" | "grid";
  actionCopyProps?: Partial<ActionCopyProps>;
  actionDeleteProps?: Partial<ActionDeleteProps>;
  actionEditProps?: Partial<ActionEditProps>;
}

export function Card({ data, actions, actionCopyProps, actionDeleteProps, actionEditProps }: CardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const { id, xlug, destination, description } = data;

  const link = `${process.env.NEXT_PUBLIC_URL ?? ""}/x/${xlug}`;

  const actionProps: Omit<ActionCopyProps & ActionDeleteProps & ActionEditProps, "buttonRef"> = {
    data,
    id,
    link,
    ...actionCopyProps,
    ...actionDeleteProps,
    ...actionEditProps,
  };

  const actionNodes: Record<Action, React.FC<any>> = {
    copy: ActionCopy,
    delete: ActionDelete,
    edit: ActionEdit,
  };

  return (
    <div className={classes.container}>
      <Flex align="center" justify="space-between" gap="xs">
        <Anchor lineClamp={1} className={classes.link} target="_blank" rel="noreferrer" href={link}>
          {`/x/${xlug}`}
        </Anchor>
        <div className={classes.actions}>
          {actions.map((action) => {
            const Component = actionNodes[action];
            const label = `${action[0].toUpperCase()}${action.slice(1)}`;

            return (
              <Tooltip
                key={action}
                disabled={isMobile}
                label={label}
                openDelay={300}
                sx={(theme) => ({ backgroundColor: theme.white })}
                refProp="buttonRef"
              >
                <Component {...actionProps} />
              </Tooltip>
            );
          })}
        </div>
      </Flex>
      <Text lineClamp={1} className={classes.destination}>
        {destination}
      </Text>
      <Text lineClamp={1} className={classes.description}>
        {description || "No description provided"}
      </Text>
    </div>
  );
}
