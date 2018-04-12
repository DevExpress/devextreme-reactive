import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { axisCoordinates } from '@devexpress/dx-chart-core';

const LayoutElement = () => {};

export class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctionX: 0,
      correctionY: 0,
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
        width: orientation === 'horizontal' ? 0 : width,
        height: orientation === 'horizontal' ? height : 0,
      });
      this.setState({
        width,
        height,
        correctionX: orientation !== 'horizontal' ? x : 0,
        correctionY: orientation !== 'horizontal' ? 0 : y,
      });
    };
  }
  render() {
    const {
      position,
      name,
      rootComponent: Root,
      tickComponent: Tick,
      labelComponent: Label,
    } = this.props;
    return (
      <Plugin name="Axis">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains, setBBox, layouts, addNodes,
             }) => {
              const placeholder = `${position}-axis`;
              const { orientation } = domains[name];
              const {
                x, y, width, height,
              } = layouts[placeholder];

              const coordinates = axisCoordinates(
                domains[name],
                position,
                width,
                height,
              );

              addNodes(<LayoutElement name={`${name}-axis-${placeholder}`} />, placeholder);

              return (
                <Root
                  refsHandler={this.createRefsHandler(
                    `${name}-axis-${placeholder}`,
                    setBBox,
                    orientation,
                  )}
                  x={x - this.state.correctionX}
                  y={y - this.state.correctionY}
                >
                  {coordinates.ticks.map(({
                      text,
                      x1,
                      x2,
                      y1,
                      y2,
                      xText,
                      yText,
                      dominantBaseline,
                      textAnchor,
                    }) => (
                      <React.Fragment key={text}>
                        <Tick x1={x1} x2={x2} y1={y1} y2={y2} />
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
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Axis.propTypes = {
  name: PropTypes.string.isRequired,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};
