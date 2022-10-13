import { CSSObject, Sx } from "@mantine/core";
import type { CSSProperties } from "react";

export const LayoutWrapperStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

export const LayoutMainStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
};

export const IdWrapperStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

export const IdTitleStyle: CSSProperties = { overflowWrap: "anywhere", marginBottom: 16 };

export const HomeGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
};

export const HomeTextStyle: CSSProperties = { width: "100%", marginTop: 16 };

export const LoginSx: Sx = (theme) => ({
  [theme.fn.smallerThan("sm")]: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  width: 500,
});

export const LoginNotificationWrapperStyle: CSSProperties = {
  position: "fixed",
  width: "100%",
  height: "100vh",
  top: 0,
  left: 0,
  zIndex: 999,
  pointerEvents: "none",
};

export const LoginNotificationStyle: CSSObject = {
  position: "absolute",
  top: 20,
  right: 20,
  pointerEvents: "initial",
  paddingLeft: 10,
  ":before": { display: "none" },
};
