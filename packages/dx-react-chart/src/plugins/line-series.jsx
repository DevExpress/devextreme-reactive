import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

const getX = ({ x }) => x;
const getY = ({ y }) => y;

const computeLinePath = (data, xScale, yScale, argumentField, valueField) =>
  data.map(dataItem => ({
    x: xScale(dataItem[argumentField]),
    y: yScale(dataItem[valueField]),
  }));

const getDAttribute = path =>
  line()
    .x(getX)
    .y(getY)(path);

export class LineSeries extends React.PureComponent {
  render() {
    const { placeholder, name, style } = this.props;
    return (
      <Plugin name="LineSeries">
        <Template name="pane">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series,
              domains,
              data,
              axes,
              argumentAxis = 'year',
              getPosition,
            }) => {
              const {
                axisName: domainName,
                argumentField,
                valueField,
              } = series.find(seriesItem => seriesItem.valueField === name);
              const { orientation } = axes.find(axis => axis.name === domainName);
              const domain = domains[domainName];
              const {
                x, y,
                width, height,
              } = getPosition(placeholder);

              const yScale = scaleLinear()
                .domain(domain)
                .range(orientation === 'horizontal'
                    ? [x, width + x]
                    : [height, 0]);
              const xDomain = domains[argumentAxis];
              const xScale = scaleLinear()
                .domain(xDomain)
                .range([0, width]);
              const path = computeLinePath(
                data,
                xScale,
                yScale,
                argumentField,
                valueField,
              );
              const dAttribute = getDAttribute(path);
              return (
                <g transform={`translate(${x} ${y})`}>
                  <path
                    d={dAttribute}
                    style={Object.assign(
                      { stroke: 'black', strokeWidth: '1px', fill: 'none' },
                      style,
                    )}
                  />
                </g>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

LineSeries.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object,
};

LineSeries.defaultProps = {
  style: null,
};

