import { Title, UnstyledButton } from "@mantine/core";
import { modals, openModal } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import { editXlugSchema } from "@/utils/schemas";
import { Create } from "@/components/Create";
import { useStyles } from "./action.styles";
import type { Database } from "@/types/supabase";

export interface ActionsEditProps {
  data: Database["public"]["Tables"]["xlugs"]["Row"];
}

export function ActionEdit({ data }: ActionsEditProps) {
  const { classes } = useStyles();

  const { id, xlug, destination, description } = data;

  return (
    <UnstyledButton
      className={classes.action}
      onClick={() => {
        openModal({
          title: <Title size="xl">Edit this xlug</Title>,
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
