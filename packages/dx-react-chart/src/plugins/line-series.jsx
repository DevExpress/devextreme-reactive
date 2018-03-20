import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { createScale } from '@devexpress/dx-chart-core';
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
    const {
      placeholder,
      name,
      rootComponent: Root,
      ...restProps
    } = this.props;
    return (
      <Plugin name="LineSeries">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series,
              domains,
              data,
              argumentAxisName,
              layouts,
            }) => {
              const {
                axisName: domainName,
                argumentField,
                valueField,
              } = series.find(seriesItem => seriesItem.valueField === name);
              const yDomain = domains[domainName];
              const {
                x, y,
                width, height,
              } = layouts[placeholder];

              const yScale = createScale(yDomain, width, height);

              const xDomain = domains[argumentAxisName];
              const xScale = createScale(xDomain, width, height);
              const path = computeLinePath(
                data,
                xScale,
                yScale,
                argumentField,
                valueField,
              );
              const d = getDAttribute(path);
              return (
                <Root
                  x={x}
                  y={y}
                  d={d}
                  {...restProps}
                />
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
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
};

LineSeries.defaultProps = {
  placeholder: 'center-center',
};
