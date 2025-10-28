import { JSX } from "solid-js";

export interface ContentProps {
  children: JSX.Element;
  contentDidMount: () => void;
  contentDidUpdate: () => void;
}

export interface FrameContextValue {
  document: Document | undefined;
  window: Window | undefined;
}

export interface FrameProps {
  style?: JSX.CSSProperties;
  head?: JSX.Element;
  initialContent?: string;
  mountTarget?: string;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
  children?: JSX.Element | JSX.Element[];
  ref?: (el: HTMLIFrameElement) => void;
  [key: string]: any; // For other iframe attributes
}
