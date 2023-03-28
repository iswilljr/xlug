import type { ModalProps, DefaultProps } from "@mantine/core";

interface ThemeComponent<Props extends DefaultProps = any> {
  defaultProps?: Partial<Props>;
  classNames?: Props["classNames"];
  styles?: Props["styles"];
}

const Modal: ThemeComponent<ModalProps> = {
  defaultProps: {
    centered: true,
    withCloseButton: false,
    overlayProps: {
      opacity: 0.5,
      blur: 5,
    },
  },
  styles: (theme) => ({
    content: {
      backgroundColor: "var(--background)",
      color: "var(--color)",
    },
    header: {
      backgroundColor: "var(--background)",
    },
  }),
};

export const components: Record<string, ThemeComponent> = {
  Modal,
};
