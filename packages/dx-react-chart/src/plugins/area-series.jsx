import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { xyScales } from '@devexpress/dx-chart-core';
import { area, symbol, symbolCircle } from 'd3-shape';

const getX = ({ x }) => x;
const getY = ({ y }) => y;

const computeLinePath = (data, xScale, yScale, argumentField, valueField) =>
  data.map(dataItem => ({
    x: xScale(dataItem[argumentField]),
    y: yScale(dataItem[valueField]),
  }));

const getDAttribute = (path, height) =>
  area()
    .x(getX)
    .y1(getY)
    .y0(height)(path);

export class AreaSeries extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      point,
      rootComponent: Root,
      pathComponent: Path,
      pointComponent: Point,
      ...restProps
    } = this.props;
    return (
      <Plugin name="AreaSeries">
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
              const d = getDAttribute(path, height);
              const dPoint = symbol().size([55]).type(symbolCircle)();
              return (
                <Root x={x} y={y}>
                  <Path
                    x={0}
                    y={0}
                    d={d}
                    {...restProps}
                  />
                  {
                  point.visible ? data.map(item =>
                      (<Point
                        key={item[argumentField]}
                        x={scales.xScale(item[argumentField])}
                        y={scales.yScale(item[valueField])}
                        d={dPoint}
                        {...point}
                      />
                    )) : null
                }
                </Root>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AreaSeries.propTypes = {
  name: PropTypes.string.isRequired,
  point: PropTypes.object,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  pointComponent: PropTypes.func.isRequired,
  pathComponent: PropTypes.func.isRequired,
};

AreaSeries.defaultProps = {
  placeholder: 'center-center',
  point: { visible: false },
};
