import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';

export class LineSeries extends React.PureComponent {
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
                x, y,
              } = layouts[placeholder];
              const {
                d,
                dPoint,
                coordinates,
              } = getSeriesAttributes(data, series, name, domains, argumentAxisName, layouts[placeholder], 'line');
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

LineSeries.propTypes = {
  name: PropTypes.string.isRequired,
  point: PropTypes.object,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  pointComponent: PropTypes.func.isRequired,
  pathComponent: PropTypes.func.isRequired,
};

LineSeries.defaultProps = {
  placeholder: 'center-center',
  point: { visible: false },
};
