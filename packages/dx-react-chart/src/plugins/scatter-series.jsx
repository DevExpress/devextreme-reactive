import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';

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
                x, y,
              } = layouts[placeholder];
              const {
                dPoint,
                coordinates,
              } = getSeriesAttributes(
                data,
                series,
                name,
                domains,
                argumentAxisName,
                layouts[placeholder],
              );
              return (
                <Root x={x} y={y}>
                  {
                    coordinates.map(item =>
                      (<Point
                        key={item.x.toString()}
                        x={item.x}
                        y={item.y}
                        d={dPoint}
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
