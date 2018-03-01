import * as React from 'react';
import * as PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const tickSize = 5;

const getAxisCoords = (scale, width, height, orientation, margin) => {
  let getTickCoords;
  if (orientation === 'horizontal') {
    getTickCoords = (tick) => {
      const xCoords = scale(tick);
      return {
        x1: xCoords,
        x2: xCoords,
        y1: height - (margin - tickSize),
        y2: height - (margin + tickSize),
        text: tick,
        xText: xCoords,
        yText: height - (margin - 20),
      };
    };
  } else {
    getTickCoords = (tick) => {
      const yCoords = scale(tick);
      return {
        y1: yCoords,
        y2: yCoords,
        x1: margin - tickSize,
        x2: margin + tickSize,
        text: tick,
        xText: margin - 20,
        yText: yCoords,
      };
    };
  }
  return {
    ticks: scale.ticks().map(getTickCoords),
  };
};

export const Axis = ({ name }) => (
  <Plugin name="Axis">
    <Template name="axis">
      <TemplatePlaceholder />
      <g>
        <TemplateConnector>
          {({
             domains, width, height, axes, margin,
          }) => {
            const domain = domains[name];
            const { orientation } = axes.find(axis => axis.name === name);
            const scale = scaleLinear()
              .domain(domain)
              .range((
                orientation === 'horizontal'
                  ? [margin, width - (2 * margin)]
                  : [height - (2 * margin), margin]
              ));
            const axesCoords = getAxisCoords(scale, width, height, orientation, parseInt(margin, 10));

            return axesCoords.ticks.map(item => (
              <React.Fragment key={item.text} >
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
            ));
          }
        }
        </TemplateConnector>
      </g>
    </Template>
  </Plugin>
);

Axis.propTypes = {
  name: PropTypes.string.isRequired,
};
