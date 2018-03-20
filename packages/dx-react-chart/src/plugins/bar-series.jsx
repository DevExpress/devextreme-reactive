import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { createScale } from '@devexpress/dx-chart-core';

export class BarSeries extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      rootComponent: Root,
      ...restProps
    } = this.props;
    return (
      <Plugin name="BarSeries">
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

              const yDomain = domains[domainName];
              const xDomain = domains[argumentAxisName];
              const yScale = createScale(yDomain, width, height);
              const xScale = createScale(xDomain, width, height);

              const barWidth = xScale.bandwidth();

              return ((
                <React.Fragment>
                  {data.map(item => (<Root
                    key={item[argumentField]}
                    x={x + xScale(item[argumentField])}
                    y={y + yScale(item[valueField])}
                    width={barWidth}
                    height={height - yScale(item[valueField])}
                    {...restProps}
                  />))}
                </React.Fragment>));
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

BarSeries.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
};

BarSeries.defaultProps = {
  placeholder: 'center-center',
};
