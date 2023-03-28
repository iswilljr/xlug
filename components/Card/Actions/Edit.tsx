import { Text, UnstyledButton } from "@mantine/core";
import { modals, openModal } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import { editXlugSchema } from "@/utils/schemas";
import { Create } from "@/components/Create";
import { useStyles } from "./action.styles";
import type { Xlug } from "@/types";

export interface ActionEditProps {
  data: Xlug;
}

export function ActionEdit({ data }: ActionEditProps) {
  const { classes } = useStyles();

  const { id, xlug, destination, description } = data;

  return (
    <UnstyledButton
      className={classes.action}
      onClick={() => {
        openModal({
          title: (
            <Text weight="bold" size="md">
              Edit this xlug
            </Text>
          ),
          children: (
            <Create
              action="/api/xlug/edit"
              actionLabel="Edit xlug"
              onFinish={() => modals.closeAll()}
              schema={editXlugSchema}
              successMessage="Successfully edited the xlug"
              buttonPosition="right"
              initialValues={{
                id,
                xlug,
                destination,
                description,
              }}
            />
          ),
        });
      }}
    >
      <IconPencil size={18} />
    </UnstyledButton>
  );
}
