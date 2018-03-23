import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';

export class SplineSeries extends React.PureComponent {
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
                x, y,
              } = layouts[placeholder];
              const {
                d,
                dPoint,
                coordinates,
              } = getSeriesAttributes(data, series, name, domains, argumentAxisName, layouts[placeholder], 'spline');
              return (
                <Root x={x} y={y}>
                  <Path
                    x={0}
                    y={0}
                    d={d}
                    {...restProps}
                  />
                  {
                  point.visible ? coordinates.map(item =>
                      (<Point
                        key={item.x.toString()}
                        x={item.x}
                        y={item.y}
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

SplineSeries.propTypes = {
  name: PropTypes.string.isRequired,
  point: PropTypes.object,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  pointComponent: PropTypes.func.isRequired,
  pathComponent: PropTypes.func.isRequired,
};

SplineSeries.defaultProps = {
  placeholder: 'center-center',
  point: { visible: false },
};
