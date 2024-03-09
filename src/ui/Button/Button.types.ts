export type TStylesClass = {
  [key: string]: string;
};

export type ButtonStyles =
  | "primary"
  | "secondary"
  | "outlinePrimary"
  | "outlineSecondary"
  | "outlineTernary"
  | "primaryUnderline"
  | "basicUnderline"
  | "primaryText"
  | "basicText"
  | "transparent";

export type ButtonSizes =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "base"
  | "lg"
  | "xl"
  | "2xl";

export type ButtonCases = "lower" | "upper" | "normal" | "capital";

export type ButtonRadius =
  | "none"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";
export interface ButtonProps extends React.ComponentProps<"button"> {
  to?: string;
  label?: string | null;
  buttonStyle?: ButtonStyles;
  size?: ButtonSizes;
  rounded?: ButtonRadius;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  overrideClass?: string | null;
  disabled?: boolean;
  cases?: ButtonCases;
  testid?: string;
  isProcessing?: boolean;
  children?: React.ReactNode;
}
export interface ButtonProps extends React.ComponentProps<"button"> {
  label?: string | null;
  buttonStyle?: ButtonStyles;
  size?: ButtonSizes;
  rounded?: ButtonRadius;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  overrideClass?: string | null;
  disabled?: boolean;
  cases?: ButtonCases;
  testid?: string;
  isProcessing?: boolean;
  children?: React.ReactNode;
}
