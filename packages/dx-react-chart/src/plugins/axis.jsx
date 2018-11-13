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
  axisCoordinates, LEFT, TOP, BOTTOM, ARGUMENT_DOMAIN, getValueDomainName, axesData,
} from '@devexpress/dx-chart-core';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';
import { withPatchedProps } from '../utils';

const SVG_STYLE = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const getZeroCoord = () => 0;
const getCorrectSize = position => (
  (position === LEFT || position === TOP) ? coord => -coord : (coord, side) => side + coord
);
const getCorrection = position => (
  (position === LEFT || position === TOP) ? coord => coord : getZeroCoord
);
const getCurrentSize = (_, side) => side;

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
    this.state = {
      xCorrection: 0,
      yCorrection: 0,
    };
    this.createRefsHandler = this.createRefsHandler.bind(this);
  }

  createRefsHandler(placeholder, changeBBox, {
    getWidth, getHeight, getXCorrection, getYCorrection,
  }) {
    return (el) => {
      if (!el) {
        return;
      }
      const {
        width, height, x, y,
      } = el.getBBox();
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === stateWidth && height === stateHeight) return;
      changeBBox({
        placeholder,
        bBox: {
          width: getWidth(x, width),
          height: getHeight(y, height),
        },
      });
      this.setState({
        width,
        height,
        xCorrection: getXCorrection(x),
        yCorrection: getYCorrection(y),
      });
    };
  }

  calculateLayout(width, height, defaultWidth, defaultHeight) {
    const calculatedWidth = width || defaultWidth;
    const calculatedHeight = height || defaultHeight;
    const {
      width: containerWidth,
      height: containerHeight,
    } = (this.node && this.node.getBoundingClientRect()) || {};

    return {
      width: containerWidth || calculatedWidth,
      height: containerHeight || calculatedHeight,
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

              const {
                width: widthCalculated, height: heightCalculated,
              } = layouts[placeholder] || { width: 0, height: 0 };
              const {
                width: widthPostCalculated,
                height: heightPostCalculated,
              } = this.calculateLayout(
                widthCalculated,
                heightCalculated,
                0,
                0,
              );
              // Isn't it too late to adjust sizes?
              const postCalculatedScale = adjustScaleRange(scale,
                [widthPostCalculated, heightPostCalculated]);
              const { sides: [dx, dy], ticks } = axisCoordinates({
                name,
                scale: postCalculatedScale,
                position,
                tickSize,
                tickFormat,
                indentFromAxis,
              });
              const { xCorrection, yCorrection } = this.state;

              return (
                <div
                  style={{
                    position: 'relative',
                    width: (dy * widthCalculated) || undefined,
                    height: (dx * heightCalculated) || undefined,
                    flexGrow: dx || undefined,
                  }}
                  // TODO: *ref* should be created in constructor.
                  ref={(node) => { this.node = node; }}
                >
                  <svg
                    width={widthPostCalculated}
                    height={heightPostCalculated}
                    style={SVG_STYLE}
                  >
                    <RootComponent
                      // TODO: *refsHandler* should be created in constructor.
                      refsHandler={this.createRefsHandler(
                        placeholder,
                        changeBBox,
                        {
                          getWidth: dx ? getCurrentSize : getCorrectSize(position),
                          getHeight: dy ? getCurrentSize : getCorrectSize(position),
                          getXCorrection: dx ? getZeroCoord : getCorrection(position),
                          getYCorrection: dy ? getZeroCoord : getCorrection(position),
                        },
                      )}
                      x={-xCorrection}
                      y={-yCorrection}
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
                        width={dx * widthPostCalculated}
                        height={dy * heightPostCalculated}
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
