/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Anchor, Flex, Text } from "@mantine/core";
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

  const { id, xlug, destination, description } = data;

  const link = `${process.env.NEXT_PUBLIC_URL ?? ""}/x/${xlug}`;

  const actionNodes: Record<Action, React.FC> = {
    copy: () => <ActionCopy link={link} {...actionCopyProps} />,
    delete: () => <ActionDelete id={id} {...actionDeleteProps} />,
    edit: () => <ActionEdit data={data} {...actionEditProps} />,
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
            return <Component key={action} />;
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
