import { Title, UnstyledButton } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useStyles as useButtonStyles } from "@/components/Button";
import axios from "redaxios";
import { useStyles } from "./action.styles";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { IconTrash } from "@tabler/icons-react";

export interface ActionDeleteProps {
  id: string;
  onDelete?: () => void;
}

export function ActionDelete({ id, onDelete }: ActionDeleteProps) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { classes: deleteButtonClasses } = useButtonStyles({ color: "red.7" });
  const { classes: cancelButtonClasses } = useButtonStyles({ color: "cyan.7" });

  return (
    <UnstyledButton
      className={cx(classes.action, classes.dangerAction)}
      onClick={() =>
        openConfirmModal({
          title: <Title size="xl">Confirm to delete</Title>,
          children:
            "Are you sure about deleting this xlug? This action cannot be reversed and you will not be able to restore all data.",
          labels: {
            cancel: "Cancel",
            confirm: "Delete",
          },

          cancelProps: {
            classNames: cancelButtonClasses,
            px: "xl",
            py: "xs",
            size: "xs",
          },
          confirmProps: {
            classNames: deleteButtonClasses,
            px: "xl",
            py: "xs",
            size: "xs",
          },
          onConfirm: async () => {
            try {
              if (onDelete) {
                onDelete();
              } else {
                await axios.post("/api/xlug/delete", { id });
                void router.push("/dashboard");
              }

              toast.success("Successfully deleted your xlug");
            } catch (error: any) {
              const message = typeof error.data === "string" ? error.data : error.data?.message;
              toast.error(message ?? "Something went wrong, try again");
            }
          },
        })
      }
    >
      <IconTrash size={18} />
    </UnstyledButton>
  );
}
