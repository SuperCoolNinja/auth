import { ReactNode } from "react";

export interface IButton {
  className: string;
  value: string | ReactNode;
  onClick?: () => void;
}