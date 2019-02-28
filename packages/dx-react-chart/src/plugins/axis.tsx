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
  axisCoordinates, LEFT, BOTTOM, ARGUMENT_DOMAIN, getValueDomainName, getGridCoordinates,
  NumberArray,
} from '@devexpress/dx-chart-core';
import { RawAxisProps, ArgumentAxisProps, ValueAxisProps, ScaleObject } from '../types';
import { Root } from '../templates/axis/root';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

import { withPatchedProps } from '../utils';

const SVG_STYLE: React.CSSProperties = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const adjustScaleRange = (scale: ScaleObject, [width, height]: NumberArray) => {
  const range = scale.range().slice();
  if (Math.abs(range[0] - range[1]) < 0.01) {
    return scale;
  }
  if (range[1] > 0) {
    range[1] = width;
  } else {
    range[0] = height;
  }
  return scale.copy().range(range);
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

  render() {
    const {
      scaleName,
      position,
      tickSize,
      tickFormat,
      indentFromAxis,
      showGrid,
      showTicks,
      showLine,
      showLabels,
      rootComponent: RootComponent,
      tickComponent: TickComponent,
      labelComponent: LabelComponent,
      lineComponent: LineComponent,
      gridComponent: GridComponent,
    } = this.props;
    const placeholder = `${position}-axis`;
    return (
      <Plugin name="Axis">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ scales, layouts }, { changeBBox }) => {
              const scale = scales[scaleName!];
              if (!scale) {
                return null;
              }

              const { width, height } = layouts[placeholder] || { width: 0, height: 0 };
              const { sides: [dx, dy], ticks } = axisCoordinates({
                scaleName: scaleName!,
                position: position!,
                tickSize: tickSize!,
                tickFormat,
                indentFromAxis: indentFromAxis!,
                // Isn't it too late to adjust sizes?
                scale: adjustScaleRange(scale, [this.adjustedWidth, this.adjustedHeight]),
              });
              const handleSizeChange: onSizeChangeFn = (size) => {
                // The callback is called when DOM is available -
                // *rootRef.current* can be surely accessed.
                const rect = this.rootRef.current!.getBoundingClientRect();
                if (rect.width === this.adjustedWidth && rect.height === this.adjustedHeight) {
                  return;
                }
                // *setState* is not used because it would cause excessive Plugin rerenders.
                // Template rerender is provided by *changeBBox* invocation.
                this.adjustedWidth = rect.width;
                this.adjustedHeight = rect.height;
                changeBBox({ placeholder, bBox: size });
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
                      {showTicks && ticks.map(({
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
                          x2={dx * this.adjustedWidth}
                          y1={0}
                          y2={dy * this.adjustedHeight}
                        />
                      )}
                      {showLabels && ticks.map(({
                        text,
                        xText,
                        yText,
                        dominantBaseline,
                        textAnchor,
                        key,
                      }) => (
                        <LabelComponent
                          key={key}
                          text={text}
                          x={xText}
                          y={yText}
                          dominantBaseline={dominantBaseline}
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

        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ scales, layouts }) => {
              const scale = scales[scaleName!];
              if (!scale || !showGrid) {
                return null;
              }

              const { width, height } = layouts.pane;
              const ticks = getGridCoordinates({ scaleName: scaleName!, scale });
              return ((
                <React.Fragment>
                  {ticks.map(({
                    key, x, dx, y, dy,
                  }) => (
                    <GridComponent
                      key={key}
                      x1={x}
                      x2={x + dx * width}
                      y1={y}
                      y2={y + dy * height}
                    />
                  ))}
                </React.Fragment>
              ));
            }}
          </TemplateConnector>
        </Template>
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

// TODO: Check that only BOTTOM and TOP are accepted.
export const ArgumentAxis: React.ComponentType<ArgumentAxisProps> = withPatchedProps(props => ({
  position: BOTTOM,
  showGrid: false,
  showTicks: true,
  showLine: true,
  showLabels: true,
  ...props,
  scaleName: ARGUMENT_DOMAIN,
}))(Axis) as any;
// Casting to *any* is done because RawAxisProps is not assignalbe to ArgumentAxisProps
// because of *position* field.

// TODO: Check that only LEFT and RIGHT are accepted.
export const ValueAxis: React.ComponentType<ValueAxisProps> = withPatchedProps(props => ({
  position: LEFT,
  showGrid: true,
  showTicks: false,
  showLine: false,
  showLabels: true,
  ...props,
  scaleName: getValueDomainName(props.scaleName),
}))(Axis) as any;
// Casting to *any* is done because RawAxisProps is not assignalbe to ValueAxisProps
// because of *position* field.
