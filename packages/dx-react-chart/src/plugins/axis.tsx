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
  axisCoordinates, createTickFilter, LEFT, BOTTOM, getGridCoordinates,
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

            const layoutName = `${placeholder}-${scaleName}`;
            const { width, height } = layouts[layoutName] || { width: 0, height: 0 };
            const { sides: [dx, dy], ticks } = axisCoordinates({
              scaleName: scaleName!,
              position: position!,
              tickSize: tickSize!,
              tickFormat,
              indentFromAxis: indentFromAxis!,
              scale,
              paneSize: [this.adjustedWidth, this.adjustedHeight],
              rotated,
            });
            // This is a workaround for a case when only a part of domain is visible.
            // "overflow: hidden" cannot be used for <svg> element because edge labels would
            // be truncated by half then.
            // Looks like some margins should be added to <svg> width/height but for now it is
            // not clear how to achieve it.
            // The solution is considered temporary by now.
            // Let's see if anything could be done to improve the situation.
            const visibleTicks = ticks
              .filter(createTickFilter([dx * this.adjustedWidth, dy * this.adjustedHeight]));
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
                    {showTicks && visibleTicks.map(({
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
                    {showLabels && visibleTicks.map(({
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
            const ticks = getGridCoordinates({
              scaleName: scaleName!,
              scale,
              paneSize: [this.adjustedWidth, this.adjustedHeight],
              rotated,
            });
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
