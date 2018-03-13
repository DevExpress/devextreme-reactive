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

const renderTick = item => (
  <React.Fragment key={item.text}>
    <line
      style={{ stroke: 'black', strokeWidth: '1px' }}
      x1={item.x1}
      x2={item.x2}
      y1={item.y1}
      y2={item.y2}
    />
    <text
      alignmentBaseline="middle"
      textAnchor="middle"
      key={item.text}
      x={item.xText}
      y={item.yText}
    >
      {item.text}
    </text>
  </React.Fragment>
);

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) {
    return;
  }
  const bBox = el.getBBox();
  setBBox(placeholder, bBox);
};

export class Axis extends React.PureComponent {
  render() {
    const { placeholder, name } = this.props;
    return (
      <Plugin name="Axis">
        <Template name="axis">
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
                  <g ref={refsHandler} transform={`translate(${x} ${y})`}>
                    {axesCoords.ticks.map(renderTick)}
                  </g>));
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
};
