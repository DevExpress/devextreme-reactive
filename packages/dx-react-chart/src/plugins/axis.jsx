import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { axisCoordinates, HORIZONTAL } from '@devexpress/dx-chart-core';

const LayoutElement = () => {};

export class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xCorrection: 0,
      yCorrection: 0,
    };
    this.createRefsHandler = this.createRefsHandler.bind(this);
  }
  createRefsHandler(placeholder, setBBox, orientation) {
    return (el) => {
      if (!el) {
        return;
      }
      const {
        width, height, x, y,
      } = el.getBBox();

      if (width === this.state.width && height === this.state.height) return;
      setBBox(placeholder, {
        width: orientation === HORIZONTAL ? 0 : width,
        height: orientation === HORIZONTAL ? height : 0,
      });
      this.setState({
        width,
        height,
        xCorrection: orientation !== HORIZONTAL ? x : 0,
        yCorrection: orientation !== HORIZONTAL ? 0 : y,
      });
    };
  }
  render() {
    const {
      tickSize,
      position,
      name,
      indentFromAxis,
      isArgumentAxis,
      rootComponent: Root,
      tickComponent: Tick,
      labelComponent: Label,
      lineComponent: Line,
    } = this.props;
    return (
      <Plugin name="Axis">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains, setBBox, layouts, addNodes, argumentAxisName,
             }) => {
              const placeholder = `${position}-axis`;
              const domain = isArgumentAxis ? domains[argumentAxisName] : domains[name];
              const { orientation } = domain;
              const {
                x, y, width, height,
              } = layouts[placeholder];

              const coordinates = axisCoordinates(
                domain,
                position,
                width,
                height,
                tickSize,
                indentFromAxis,
              );

              addNodes(<LayoutElement name={`${name}-axis-${placeholder}`} />, placeholder);

              return (
                <React.Fragment>
                  {
                    coordinates.ticks.map(({
                      x1, x2, y1, y2, text,
                    }) => (
                      <Tick
                        key={text}
                        x1={x1 + (x - this.state.xCorrection)}
                        x2={x2 + (x - this.state.xCorrection)}
                        y1={y1 + (y - this.state.yCorrection)}
                        y2={y2 + (y - this.state.yCorrection)}
                      />
                      ))
                  }
                  <Root
                    refsHandler={this.createRefsHandler(
                    `${name}-axis-${placeholder}`,
                    setBBox,
                    orientation,
                  )}
                    x={x - this.state.xCorrection}
                    y={y - this.state.yCorrection}
                  >
                    <Line
                      width={width}
                      height={height}
                      orientation={orientation}
                    />
                    {coordinates.ticks.map(({
                      text,
                      xText,
                      yText,
                      dominantBaseline,
                      textAnchor,
                    }) => (
                      <React.Fragment key={text}>
                        <Label
                          text={text}
                          x={xText}
                          y={yText}
                          dominantBaseline={dominantBaseline}
                          textAnchor={textAnchor}
                        />
                      </React.Fragment>
                    ))}
                  </Root>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Axis.propTypes = {
  name: PropTypes.string,
  isArgumentAxis: PropTypes.bool,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  lineComponent: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  tickSize: PropTypes.number,
  indentFromAxis: PropTypes.number,
};

Axis.defaultProps = {
  tickSize: 5,
  indentFromAxis: 10,
  name: undefined,
  isArgumentAxis: false,
};
