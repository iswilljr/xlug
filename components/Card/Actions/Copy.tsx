import { UnstyledButton } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import { useStyles } from "./action.styles";

export interface ActionCopyProps {
  link: string;
}

const copyToClipboard = async (txt: string) => {
  try {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([txt], { type: "text/plain" }),
    });
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    await navigator.clipboard.writeText(txt);
  }
  toast.success("Copied to clipboard!");
};

export function ActionCopy({ link }: ActionCopyProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.action} onClick={() => copyToClipboard(link)}>
      <IconCopy size={18} />
    </UnstyledButton>
  );
}
