import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  PluginComponents,
  onSizeChangeFn,
} from '@devexpress/dx-react-core';
import {
  ARGUMENT_DOMAIN, getValueDomainName,
  getRotatedPosition, isValidPosition,
  LEFT, BOTTOM, getTickCoordinates, gridCoordinatesGetter, tickCoordinatesGetter,
  Tick, Grid,
} from '@devexpress/dx-chart-core';
import { RawAxisProps } from '../types';
import { Root } from '../templates/axis/root';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

import { withPatchedProps } from '../utils';

const SVG_STYLE: React.CSSProperties = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

class RawAxis extends React.PureComponent<RawAxisProps> {
  static components: PluginComponents = {
    rootComponent: 'Root',
    tickComponent: 'Tick',
    labelComponent: 'Label',
    lineComponent: 'Line',
    gridComponent: 'Grid',
  };
  static defaultProps: Partial<RawAxisProps> = {
    tickSize: 5,
    indentFromAxis: 10,
  };

  rootRef = React.createRef<HTMLDivElement>();
  adjustedWidth = 0;
  adjustedHeight = 0;

  renderAxis(position: string) {
    const {
      scaleName,
      tickSize,
      tickFormat,
      indentFromAxis,
      showTicks,
      showLine,
      showLabels,
      rootComponent: RootComponent,
      tickComponent: TickComponent,
      labelComponent: LabelComponent,
      lineComponent: LineComponent,
    } = this.props;
    const placeholder = `${position}-axis`;
    const layoutName = `${placeholder}-${scaleName}`;
    return (
      <Template name={placeholder}>
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ scales, layouts, rotated }, { changeBBox }) => {
            if (!isValidPosition(position!, scaleName!, rotated)) {
              return null;
            }
            const scale = scales[scaleName!];
            if (!scale) {
              return null;
            }
            const { width, height } = layouts[layoutName] || { width: 0, height: 0 };
            const paneSize = layouts.pane;

            const { sides: [dx, dy], ticks } = getTickCoordinates({
              callback: tickCoordinatesGetter,
              scaleName: scaleName!,
              position: position!,
              tickSize: tickSize!,
              tickFormat,
              indentFromAxis: indentFromAxis!,
              scale,
              paneSize: [paneSize.width, paneSize.height],
              rotated,
            });

            const handleSizeChange: onSizeChangeFn = (size) => {
              // The callback is called when DOM is available -
              // *rootRef.current* can be surely accessed.
              const rect = this.rootRef.current!.getBoundingClientRect();
              const rectSize = [dx ? rect.width : size.width, dy ? rect.height : size.height];

              if (rectSize[0] === this.adjustedWidth && rectSize[1] === this.adjustedHeight) {
                return;
              }
              // *setState* is not used because it would cause excessive Plugin rerenders.
              // Template rerender is provided by *changeBBox* invocation.
              this.adjustedWidth = rectSize[0];
              this.adjustedHeight = rectSize[1];
              changeBBox({ placeholder: layoutName, bBox: size });
            };

            return (
              <div
                style={{
                  position: 'relative',
                  width: (dy * width) || undefined,
                  height: (dx * height) || undefined,
                  flexGrow: dx || undefined,
                }}
                ref={this.rootRef}
              >
                <svg
                  width={this.adjustedWidth}
                  height={this.adjustedHeight}
                  style={SVG_STYLE}
                >
                  <RootComponent
                    dx={dx}
                    dy={dy}
                    onSizeChange={handleSizeChange}
                  >
                    {showTicks && (ticks as Tick[]).map(({
                      x1, x2, y1, y2, key,
                    }) => (
                      <TickComponent
                        key={key}
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                      />
                    ))}
                    {showLine && (
                      <LineComponent
                        x1={0}
                        x2={dx * paneSize.width}
                        y1={0}
                        y2={dy * paneSize.height}
                      />
                    )}
                    {showLabels && (ticks as Tick[]).map(({
                      text,
                      xText,
                      yText,
                      dy: delta,
                      textAnchor,
                      key,
                    }) => (
                      <LabelComponent
                        key={key}
                        text={text}
                        x={xText}
                        y={yText}
                        dy={delta}
                        textAnchor={textAnchor}
                      />
                    ))}
                  </RootComponent>
                </svg>
              </div>
            );
          }}
        </TemplateConnector>
      </Template>
    );
  }

  renderGrid() {
    const {
      scaleName,
      showGrid,
      gridComponent: GridComponent,
    } = this.props;
    return (
      <Template name="series">
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ scales, layouts, rotated }) => {
            const scale = scales[scaleName!];
            if (!scale || !showGrid) {
              return null;
            }
            const { width, height } = layouts.pane;
            const { ticks, sides: [dx, dy] } = getTickCoordinates({
              callback: gridCoordinatesGetter,
              scaleName: scaleName!,
              scale,
              paneSize: [width, height],
              rotated,
            });
            return ((
              <>
                {(ticks as Grid[]).map(({
                  key, x1, y1,
                }) => (
                  <GridComponent
                    key={key}
                    x1={x1}
                    x2={x1 + dy * width}
                    y1={y1}
                    y2={y1 + dx * height}
                  />
                ))}
              </>
            ));
          }}
        </TemplateConnector>
      </Template>
    );
  }

  render() {
    const { position } = this.props;
    const rotatedPosition = getRotatedPosition(position!);
    // We have to occupy two placeholders (one for default case and one for rotated case) because
    // by now it is unknown if Chart is rotated or not.
    // Only one of templates is rendered then, the other is discarded.
    return (
      <Plugin name="Axis">
        {this.renderAxis(position!)}
        {this.renderAxis(rotatedPosition)}
        {this.renderGrid()}
      </Plugin>
    );
  }
}
/** @internal */
export const Axis: React.ComponentType<RawAxisProps> = withComponents({
  Label,
  Line,
  Root,
  Tick: Line,
  Grid: Line,
})(RawAxis);

// TODO: It is not axis who defines that argument is HORIZONTAL and value is VERTICAL.

// TODO: *position* should not be *orientation* dependent -
// if HORIZONTAL then TOP or BOTTOM, otherwise LEFT of RIGHT.
// It should be domain dependent - something like AT_DOMAIN_START or AT_DOMAIN_END.

export const ArgumentAxis: React.ComponentType<RawAxisProps> = withPatchedProps(props => ({
  position: BOTTOM,
  showGrid: false,
  showTicks: true,
  showLine: true,
  showLabels: true,
  ...props,
  scaleName: ARGUMENT_DOMAIN,
}))(Axis);

export const ValueAxis: React.ComponentType<RawAxisProps> = withPatchedProps(props => ({
  position: LEFT,
  showGrid: true,
  showTicks: false,
  showLine: false,
  showLabels: true,
  ...props,
  scaleName: getValueDomainName(props.scaleName),
}))(Axis);
