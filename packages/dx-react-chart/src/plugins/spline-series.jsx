import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { xyScales } from '@devexpress/dx-chart-core';
import { line, curveBasis } from 'd3-shape';

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
    .y(getY)
    .curve(curveBasis)(path);

export class SplineSeries extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      pathComponent: Path,
      ...restProps
    } = this.props;
    return (
      <Plugin name="SplineSeries">
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
              const {
                x, y,
                width, height,
              } = layouts[placeholder];
              const scales = xyScales(domains, argumentAxisName, domainName, width, height);
              const path = computeLinePath(
                data,
                scales.xScale,
                scales.yScale,
                argumentField,
                valueField,
              );
              const d = getDAttribute(path);
              return (
                <Path
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

SplineSeries.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  pathComponent: PropTypes.func.isRequired,
};

SplineSeries.defaultProps = {
  placeholder: 'center-center',
};
