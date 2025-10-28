import {
  createContext,
  useContext,
  ParentComponent,
  Component,
} from "solid-js";
import { FrameContextValue } from "./types";

let doc: Document | undefined;
let win: Window | undefined;
if (typeof document !== "undefined") {
  doc = document;
}
if (typeof window !== "undefined") {
  win = window;
}

export const FrameContext = createContext<FrameContextValue>({
  document: doc,
  window: win,
});

export const useFrame = () => useContext(FrameContext);

const FrameContextProvider: ParentComponent<{ value: FrameContextValue }> = (
  props
) => {
  return (
    <FrameContext.Provider value={props.value}>
      {props.children}
    </FrameContext.Provider>
  );
};

const FrameContextConsumer: Component<{
  children: (value: FrameContextValue) => any;
}> = (props) => {
  const frameContext = useFrame();
  return props.children(frameContext);
};

export { FrameContextProvider, FrameContextConsumer };
