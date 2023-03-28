/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Anchor, Text } from "@mantine/core";
import { useStyles } from "./Card.styles";
import { ActionCopy, type ActionCopyProps } from "./Actions/Copy";
import { ActionEdit, type ActionsEditProps } from "./Actions/Edit";
import { ActionDelete, type ActionDeleteProps } from "./Actions/Delete";
import type { Database } from "@/types/supabase";

export type Action = "copy" | "delete" | "edit";

export interface CardProps {
  actions: Action[];
  data: Database["public"]["Tables"]["xlugs"]["Row"];
  withActions?: boolean;
  actionCopyProps?: Partial<ActionCopyProps>;
  actionDeleteProps?: Partial<ActionDeleteProps>;
  actionEditProps?: Partial<ActionsEditProps>;
}

export function Card({
  data,
  withActions = true,
  actions,
  actionCopyProps,
  actionDeleteProps,
  actionEditProps,
}: CardProps) {
  const { classes, cx } = useStyles();

  const { id, xlug, destination, description } = data;

  const link = `https://xlug.vercel.app/x/${xlug}`;

  const actionNodes: Record<Action, React.FC> = {
    copy: () => <ActionCopy link={link} {...actionCopyProps} />,
    delete: () => <ActionDelete id={id} {...actionDeleteProps} />,
    edit: () => <ActionEdit data={data} {...actionEditProps} />,
  };

  return (
    <div className={classes.container}>
      <Anchor className={cx(classes.link, classes.truncate)} target="_blank" rel="noreferrer" href={link}>
        /x/{xlug}
      </Anchor>
      <Text className={classes.destination}>{destination}</Text>
      <Text lineClamp={4} className={classes.description}>
        {description || "No description provided"}
      </Text>
      <div className={classes.actions}>
        {actions.map((action) => {
          const Component = actionNodes[action];
          return <Component key={action} />;
        })}
      </div>
    </div>
  );
}
