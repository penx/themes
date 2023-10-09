import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { gridPropDefs } from './grid.props';
import {
  extractLayoutProps,
  extractMarginProps,
  styles,
  withBreakpoints,
  withInlineLayoutStyles,
  withLayoutProps,
  withMarginProps,
} from '../helpers';

import {
  MarginProps,
  LayoutProps,
  GetPropDefTypes,
  withInlineResponsiveVariable,
} from '../helpers';

type GridElement = React.ElementRef<'div'>;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    GridOwnProps {
  asChild?: boolean;
}
const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    display = gridPropDefs.display.default,
    columns = gridPropDefs.columns.default,
    rows = gridPropDefs.rows.default,
    flow = gridPropDefs.flow.default,
    align = gridPropDefs.align.default,
    justify = gridPropDefs.justify.default,
    gap = gridPropDefs.gap.default,
    gapX = gridPropDefs.gapX.default,
    gapY = gridPropDefs.gapY.default,
    style,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...gridProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Grid',
        className,
        withBreakpoints(display, 'rt-r-display'),
        withBreakpoints(flow, 'rt-r-gaf'),
        withBreakpoints(align, 'rt-r-ai'),
        withBreakpoints(justify, 'rt-r-jc', { between: 'space-between' }),
        withBreakpoints(gap, 'rt-r-gap'),
        withBreakpoints(gapX, 'rt-r-cg'),
        withBreakpoints(gapY, 'rt-r-rg'),
        withLayoutProps(layoutProps),
        withMarginProps(marginProps),
        withBreakpoints(columns, 'rt-r-gtc', undefined, true),
        withBreakpoints(rows, 'rt-r-gtr', undefined, true)
      )}
      style={styles(
        withInlineResponsiveVariable('--grid-template-rows', rows, parseGridValue),
        withInlineResponsiveVariable('--grid-template-columns', columns, parseGridValue),
        withInlineLayoutStyles(layoutProps),
        style
      )}
    />
  );
});
Grid.displayName = 'Grid';

function parseGridValue(value: string | undefined) {
  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

export { Grid };
export type { GridProps };
