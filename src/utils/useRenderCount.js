import { useRef } from "react";

export default function useRenderCount(componentName) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  if (__DEV__) {
    console.log(`[RenderCount] ${componentName}: ${renderCount.current}`);
  }

  return renderCount.current;
}
