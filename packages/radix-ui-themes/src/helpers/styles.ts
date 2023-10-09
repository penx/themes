type InlineStyle = React.CSSProperties | Record<string, string | undefined> | undefined;

// A utility to merge inline styles
export function styles(...styles: Array<InlineStyle>): InlineStyle {
  let result: InlineStyle = {};

  for (const style of styles) {
    if (style) {
      result = { ...style, ...result };
    }
  }

  return Object.keys(result).length ? result : undefined;
}
