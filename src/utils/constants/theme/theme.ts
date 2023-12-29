import { ThemeConfig } from "antd";

export const THEME_PROPS: ThemeConfig = {
  token: {
    fontFamily: "Fira Sans Condensed, sans-serif",

    // Base bg colors/ Layout
    colorBgBase: "var(--color-base)",
    colorBgContainer: "var(--color-container)",
    colorBgContainerDisabled: "var(--color-container-disabled)",
    colorBgElevated: "var(--color-elevated)",
    colorBgLayout: "var(--color-layout)",
    colorBgMask: "var(--color-mask)",
    colorBgSpotlight: "var(--color-spotlight)",
    colorBgTextActive: "var(--color-text-active)",
    colorBgTextHover: "var(--color-text-hover)",

    // Border
    colorBorder: "#d9d9d9",
    colorBorderBg: "#ffffff",
    colorBorderSecondary: "var(--color-primary-border)",

    // Text
    colorText: "var(--color-text)",
    colorTextBase: "var(--color-text-base)",
    colorTextDescription: "var(--color-text-description)",
    colorTextDisabled: "var(--color-text-disabled)",
    colorTextHeading: "var(--color-text-heading)",
    colorTextLabel: "var(--color-text-label)",
    colorTextLightSolid: "var(--color-text-light-solid)",
    colorTextPlaceholder: "var(--color-text-placeholder)",
    colorTextQuaternary: "var(--color-text-quaternary)",
    colorTextSecondary: "var(--color-text-secondary)",
    colorTextTertiary: "var(--color-text-tertiary)",

    // Fill (some colors not working)
    colorFill: "var(--color-text-active)",
    colorFillAlter: "rgba(0, 0, 0, 0.02)",
    colorFillContent: "var(--color-text-hover)",
    colorFillContentHover: "var(--color-text-active)",
    colorFillQuaternary: "rgba(0, 0, 0, 0.02)",
    colorFillSecondary: "var(--color-text-hover)",
    colorFillTertiary: "var(--color-container-disabled)",

    colorHighlight: "#ff4d4f",

    // Icon
    colorIcon: "var(--color-mask)",
    colorIconHover: "var(--color-text)",

    // Info
    colorInfo: "var(--color-6)",
    colorInfoActive: "var(--color-7)",
    colorInfoBg: "var(--color-1)",
    colorInfoBgHover: "var(--color-2)",
    colorInfoBorder: "var(--color-3)",
    colorInfoBorderHover: "var(--color-8)",
    colorInfoHover: "var(--color-8)",
    colorInfoText: "var(--color-6)",
    colorInfoTextActive: "var(--color-7)",
    colorInfoTextHover: "var(--color-5)",

    // Link
    colorLink: "#5d37f3",
    colorLinkActive: "var(--color-7)",
    colorLinkHover: "var(--color-8)",

    // Primary
    colorPrimary: "#5d37f3",
    colorPrimaryActive: "var(--color-7)",
    colorPrimaryBg: "var(--color-1)",
    colorPrimaryBgHover: "var(--color-2)",
    colorPrimaryBorder: "var(--color-3)",
    colorPrimaryBorderHover: "var(--color-8)",
    colorPrimaryHover: "var(--color-5)",
    colorPrimaryText: "var(--color-6)",
    colorPrimaryTextActive: "var(--color-7)",
    colorPrimaryTextHover: "var(--color-5)",

    colorSplit: "var(--color-split)",

    // Success
    colorSuccess: "#52c41a",
    colorSuccessActive: "#389e0d",
    colorSuccessBg: "#f6ffed",
    colorSuccessBgHover: "#d9f7be",
    colorSuccessBorder: "#b7eb8f",
    colorSuccessBorderHover: "#95de64",
    colorSuccessHover: "#95de64",
    colorSuccessText: "#52c41a",
    colorSuccessTextActive: "#389e0d",
    colorSuccessTextHover: "#73d13d",

    // Warning
    colorWarning: "#faad14",
    colorWarningActive: "#d48806",
    colorWarningBg: "#fffbe6",
    colorWarningBgHover: "#fff1b8",
    colorWarningBorder: "#ffe58f",
    colorWarningBorderHover: "#ffd666",
    colorWarningHover: "#ffd666",
    colorWarningOutline: "rgba(255, 215, 5, 0.1)",
    colorWarningText: "#faad14",
    colorWarningTextActive: "#d48806",
    colorWarningTextHover: "#ffc53d",

    // Error/Danger
    colorError: "#ff4d4f",
    colorErrorActive: "#d9363e",
    colorErrorBg: "#fff2f0",
    colorErrorBgHover: "#fff1f0",
    colorErrorBorder: "#ffccc7",
    colorErrorBorderHover: "#ffa39e",
    colorErrorHover: "#ff7875",
    colorErrorOutline: "rgba(255, 38, 5, 0.06)",
    colorErrorText: "#ff4d4f",
    colorErrorTextActive: "#d9363e",
    colorErrorTextHover: "#ff7875",

    colorWhite: "#fff",

    // Controll
    controlItemBgActive: "var(--color-1)",
    controlItemBgActiveDisabled: "var(--color-text-active)",
    controlItemBgActiveHover: "var(--color-2)",
    controlItemBgHover: "var(--color-container-disabled)",
    controlOutline: "rgba(5, 145, 255, 0.1)",
    controlTmpOutline: "rgba(0, 0, 0, 0.02)",

    // Boxshadow
    boxShadow:
      "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    boxShadowSecondary:
      "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    boxShadowTertiary:
      "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
  },
  // components: {
  //   Select: {
  //     colorBorder: "var(--color-primary-border)",
  //   },
  //   Input: {
  //     colorBorder: "var(--color-primary-border)",
  //   },
  //   Button: {
  //     colorBorder: "var(--color-primary-border)",
  //   },
  // },
};
