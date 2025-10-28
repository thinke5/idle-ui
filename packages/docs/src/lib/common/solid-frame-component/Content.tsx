// import {
//   createEffect,
//   onMount,
//   children as resolveChildren,
//   JSX,
// } from "solid-js";
// import { ContentProps } from "./types";

// export default function Content(props: ContentProps) {
//   const resolved = resolveChildren(() => props.children);
//   let isFirstRun = true;

//   onMount(() => {
//     props.contentDidMount();
//   });

//   createEffect(() => {
//     // Access resolved to track changes
//     // console.log("Content effect triggered");
//     resolved();

//     // Skip calling contentDidUpdate on the first run
//     if (isFirstRun) {
//       isFirstRun = false;
//       return;
//     }

//     props.contentDidUpdate();
//   });

//   return resolved() as JSX.Element;
// }

import {
  createEffect,
  onMount,
  children as resolveChildren,
  JSX,
} from "solid-js";
import { ContentProps } from "./types";

export default function Content(props: ContentProps) {
  const resolved = resolveChildren(() => props.children);
  let isFirstRun = true;

  onMount(() => {
    props.contentDidMount();
  });

  createEffect(() => {
    // Access resolved to track changes
    resolved();

    // Skip calling contentDidUpdate on the first run
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    props.contentDidUpdate();
  });

  // Mimic React's Children.only behavior
  const getOnlyChild = (): JSX.Element => {
    const children = resolved();

    if (Array.isArray(children)) {
      if (children.length !== 1) {
        throw new Error("Content component expects exactly one child element");
      }
      return children[0] as JSX.Element;
    }

    if (children == null) {
      throw new Error("Content component expects exactly one child element");
    }

    return children as JSX.Element;
  };

  return getOnlyChild();
}
