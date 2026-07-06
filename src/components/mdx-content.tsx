import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as ComponentType<{
    components?: Record<string, ComponentType>;
  }>;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, ComponentType>;
}) {
  const Component = getMDXComponent(code);
  // eslint-disable-next-line react-hooks/static-components -- compiling a component from MDX source is inherently dynamic
  return <Component components={components} />;
}
