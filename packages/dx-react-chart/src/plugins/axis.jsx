import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  Getter,
} from '@devexpress/dx-react-core';
import {
  axisCoordinates, HORIZONTAL, LEFT, BOTTOM, ARGUMENT_DOMAIN, getValueDomainName, axesData,
} from '@devexpress/dx-chart-core';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';
import { withPatchedProps, withComponents } from '../utils';

const getZeroCoord = () => 0;
const getCorrectSize = position => ((position === 'left' || position === 'top') ? coord => -coord : (coord, side) => side + coord);
const getCorrection = position => ((position === 'left' || position === 'top') ? coord => coord : getZeroCoord);
const getCurrentSize = (_, side) => side;

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
      tickSize,
      position,
      name,
      indentFromAxis,
      rootComponent: RootComponent,
      tickComponent: TickComponent,
      labelComponent: LabelComponent,
      lineComponent: LineComponent,
    } = this.props;
    const getAxes = ({ axes }) => axesData(axes, this.props);
    return (
      <Plugin name="Axis">
        <Getter name="axes" computed={getAxes} />
        <Template name={`${position}-axis`}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains,
              scales,
              layouts,
            }, {
              changeBBox,
            }) => {
              // TODO: Take axis from "axes" getter rather then from closure.
              const placeholder = `${position}-axis`;
              const domain = domains[name];
              const scale = scales[name];
              // TODO_DEBUG
              if (!domain) { throw new Error(`domain is not found: ${name}`); }
              // TODO_DEBUG
              const { orientation } = domain;
              const { width: widthCalculated, height: heightCalculated } = layouts[placeholder]
                    || { width: 0, height: 0 };

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
              const postCalculatedScale = scale.copy().range(
                orientation === HORIZONTAL ? [0, widthPostCalculated] : [heightPostCalculated, 0],
              );
              const coordinates = axisCoordinates(
                // TODO: Only *orientation* and *tickFormat* are taken from *domain* -
                // take *tickFormat* directly from props.
                domain,
                postCalculatedScale,
                position,
                tickSize,
                indentFromAxis,
              );
              const {
                xCorrection,
                yCorrection,
              } = this.state;

              return (
                <div
                  style={{
                    position: 'relative',
                    width: orientation === HORIZONTAL ? undefined : widthCalculated,
                    height: orientation === HORIZONTAL ? heightCalculated : null,
                    flexGrow: orientation === HORIZONTAL ? 1 : undefined,
                  }}
                  ref={(node) => { this.node = node; }}
                >
                  <svg
                    width={widthPostCalculated}
                    height={heightPostCalculated}
                    style={{
                      position: 'absolute', left: 0, top: 0, overflow: 'visible',
                    }}
                  >
                    <RootComponent
                      refsHandler={this.createRefsHandler(
                        placeholder,
                        changeBBox,
                        {
                          getWidth: orientation !== HORIZONTAL
                            ? getCorrectSize(position) : getCurrentSize,
                          getHeight: orientation === HORIZONTAL
                            ? getCorrectSize(position) : getCurrentSize,
                          getXCorrection: orientation !== HORIZONTAL
                            ? getCorrection(position) : getZeroCoord,
                          getYCorrection: orientation === HORIZONTAL
                            ? getCorrection(position) : getZeroCoord,
                        },
                      )}
                      x={-xCorrection}
                      y={-yCorrection}
                    >
                      {
                      coordinates.ticks.map(({
                        x1, x2, y1, y2, key,
                      }) => (
                        <TickComponent
                          key={key}
                          x1={x1}
                          x2={x2}
                          y1={y1}
                          y2={y2}
                        />
                      ))
                    }
                      <LineComponent
                        width={widthPostCalculated}
                        height={heightPostCalculated}
                        orientation={orientation}
                      />
                      {coordinates.ticks.map(({
                        text,
                        xText,
                        yText,
                        dominantBaseline,
                        textAnchor,
                        key,
                      }) => (
                        <React.Fragment key={key}>
                          <LabelComponent
                            text={text}
                            x={xText}
                            y={yText}
                            dominantBaseline={dominantBaseline}
                            textAnchor={textAnchor}
                          />
                        </React.Fragment>
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
  indentFromAxis: PropTypes.number,
};

RawAxis.defaultProps = {
  tickSize: 5,
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
