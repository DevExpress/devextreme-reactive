import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  Getter,
  withComponents,
} from '@devexpress/dx-react-core';
import {
  axisCoordinates, LEFT, BOTTOM, ARGUMENT_DOMAIN, getValueDomainName, axesData,
} from '@devexpress/dx-chart-core';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';
import { withPatchedProps } from '../utils';

const SVG_STYLE = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const adjustScaleRange = (scale, [width, height]) => {
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

class RawAxis extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRootRef = (node) => {
      this.node = node;
    };
  }

  render() {
    const {
      name,
      position,
      tickSize,
      tickFormat,
      indentFromAxis,
      rootComponent: RootComponent,
      tickComponent: TickComponent,
      labelComponent: LabelComponent,
      lineComponent: LineComponent,
    } = this.props;
    const placeholder = `${position}-axis`;
    // TODO: Remove *axes* getter as it is not used by Axis itself -
    // it is used in domains calculation (where it shouldn't be used).
    const getAxes = ({ axes }) => axesData(axes, this.props);
    return (
      <Plugin name="Axis">
        <Getter name="axes" computed={getAxes} />
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ scales, layouts }, { changeBBox }) => {
              const scale = scales[name];
              if (!scale) {
                return null;
              }

              const { width, height } = layouts[placeholder] || { width: 0, height: 0 };
              // DOM content should not be accessed in *render* - it should be done
              // in *componentDidMount* and *componentDidUpdate*.
              // TODO: Remove references to *this.node*.
              const { width: postWidth, height: postHeight } = (
                this.node ? this.node.getBoundingClientRect() : { width, height }
              );
              // Isn't it too late to adjust sizes?
              const postCalculatedScale = adjustScaleRange(scale, [postWidth, postHeight]);
              const { sides: [dx, dy], ticks } = axisCoordinates({
                name,
                scale: postCalculatedScale,
                position,
                tickSize,
                tickFormat,
                indentFromAxis,
              });

              return (
                <div
                  style={{
                    position: 'relative',
                    width: (dy * width) || undefined,
                    height: (dx * height) || undefined,
                    flexGrow: dx || undefined,
                  }}
                  ref={this.setRootRef}
                >
                  <svg
                    width={postWidth}
                    height={postHeight}
                    style={SVG_STYLE}
                  >
                    <RootComponent
                      dx={dx}
                      dy={dy}
                      onSizeChange={bBox => changeBBox({ placeholder, bBox })}
                    >
                      {ticks.map(({
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
                      <LineComponent
                        width={dx * postWidth}
                        height={dy * postHeight}
                      />
                      {ticks.map(({
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
      </Plugin>
    );
  }
}

RawAxis.propTypes = {
  name: PropTypes.string.isRequired,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  lineComponent: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  tickSize: PropTypes.number,
  tickFormat: PropTypes.func,
  indentFromAxis: PropTypes.number,
};

RawAxis.defaultProps = {
  tickSize: 5,
  tickFormat: undefined,
  indentFromAxis: 10,
};

RawAxis.components = {
  rootComponent: 'Root',
  tickComponent: 'Tick',
  labelComponent: 'Label',
  lineComponent: 'Line',
};

export const Axis = withComponents({
  Root, Tick, Label, Line,
})(RawAxis);

// TODO: It is not axis who defines that argument is HORIZONTAL and value is VERTICAL.

// TODO: *position* should not be *orientation* dependent -
// if HORIZONTAL then TOP or BOTTOM, otherwise LEFT of RIGHT.
// It should be domain dependent - something like AT_DOMAIN_START or AT_DOMAIN_END.

// TODO: Check that only BOTTOM and TOP are accepted.
export const ArgumentAxis = withPatchedProps(props => ({
  position: BOTTOM,
  ...props,
  name: ARGUMENT_DOMAIN,
}))(Axis);

// TODO: Check that only LEFT and RIGHT are accepted.
export const ValueAxis = withPatchedProps(props => ({
  position: LEFT,
  ...props,
  name: getValueDomainName(props.name),
}))(Axis);

ArgumentAxis.components = Axis.components;
ValueAxis.components = Axis.components;
