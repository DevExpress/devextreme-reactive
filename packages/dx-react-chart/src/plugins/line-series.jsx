import * as React from 'react';
import { Template, Plugin, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const margin = 40;

const computeLinePath = (data, xscale, yscale, argumentField, valueField) =>
  data.map(dataItem => ({
    x: xscale(dataItem[argumentField]),
    y: yscale(dataItem[valueField]),
  }));

const getDAttribute = path => line()
  .x(getX)
  .y(getY)(path);

export const LineSeries = ({ name, style }) => (
  <Plugin name="LineSeries">
    <Template name="pane">
      <TemplatePlaceholder />
      <TemplateConnector>
        {({
 series, domains, data, axes, width, height, argumentAxis = 'year',
}) => {
          const { axisName: domainName, argumentField, valueField } = series.find(seriesItem => seriesItem.valueField === name);
          const { orientation } = axes.find(axis => axis.name === domainName);
          const domain = domains[domainName];
          const yScale = scaleLinear()
            .domain(domain)
            .range((
              orientation === 'horizontal'
                ? [margin, width - (2 * margin)]
                : [height - (2 * margin), margin]));
          const xDomain = domains[argumentAxis];
          const xScale = scaleLinear().domain(xDomain).range([margin, width - (2 * margin)]);
          const path = computeLinePath(data, xScale, yScale, argumentField, valueField);
          const dAttribute = getDAttribute(path);
          return (
            <g>
              <path
                d={dAttribute}
                style={Object.assign({ stroke: 'black', strokeWidth: '1px', fill: 'none' }, style)}
              />
            </g>
          );
        }}
      </TemplateConnector>
    </Template>
  </Plugin>
);
