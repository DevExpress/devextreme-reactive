import * as React from 'react';
import * as PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const tickSize = 10;

const getAxisCoords = (scale, width, height, orientation) => {
  let getTickCoords;
  if (orientation === 'horizontal') {
    getTickCoords = (tick) => {
      const xCoords = scale(tick);
      return {
        x1: xCoords,
        x2: xCoords,
        y1: 0,
        y2: tickSize,
        text: tick,
        xText: xCoords,
        yText: 20,
      };
    };
  } else {
    getTickCoords = (tick) => {
      const yCoords = scale(tick);
      return {
        y1: yCoords,
        y2: yCoords,
        x1: 30,
        x2: 30 + tickSize,
        text: tick,
        xText: 15,
        yText: yCoords,
      };
    };
  }
  return {
    ticks: scale.ticks().map(getTickCoords),
  };
};

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) {
    return;
  }
  const bBox = el.getBBox();
  setBBox(placeholder, bBox);
};

export class Axis extends React.PureComponent {
  render() {
    const {
      placeholder,
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
                   domains, axes, setBBox, layouts,
               }) => {
                 const {
                    x, y, width, height,
                } = layouts[placeholder];

                const refsHandler = createRefsHandler(placeholder, setBBox);
                const domain = domains[name];
                const { orientation } = axes.find(axis => axis.name === name);
                const scale = scaleLinear()
                  .domain(domain)
                  .range(orientation === 'horizontal'
                      ? [0, width]
                      : [height, 0]);
                const axesCoords = getAxisCoords(
                  scale,
                  width,
                  height,
                  orientation,
                );

                return ((
                  <Root refsHandler={refsHandler} x={x} y={y}>
                    {axesCoords.ticks.map(({
                      text, x1, x2, y1, y2, xText, yText,
                    }) => (
                      <React.Fragment key={text}>
                        <Tick
                          x1={x1}
                          x2={x2}
                          y1={y1}
                          y2={y2}
                        />
                        <Label
                          text={text}
                          x={xText}
                          y={yText}
                        />
                      </React.Fragment>
                    ))}
                  </Root>));
              }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Axis.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
};
