import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { symbol, symbolCircle } from 'd3-shape';
import { xyScales } from '@devexpress/dx-chart-core';

export class ScatterSeries extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      rootComponent: Root,
      pointComponent: Point,
      ...restProps
    } = this.props;
    return (
      <Plugin name="ScatterSeries">
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
              const d = symbol().size([55]).type(symbolCircle)();
              return (
                <Root x={x} y={y}>
                  {
                  data.map(item =>
                      (<Point
                        key={item[argumentField]}
                        x={scales.xScale(item[argumentField])}
                        y={scales.yScale(item[valueField])}
                        d={d}
                        {...restProps}
                      />
                    ))
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

ScatterSeries.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  pointComponent: PropTypes.func.isRequired,
};

ScatterSeries.defaultProps = {
  placeholder: 'center-center',
};
