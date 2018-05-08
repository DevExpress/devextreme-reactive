import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pieAttributes, findSeriesByName } from '@devexpress/dx-chart-core';

export class PieSeries extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      innerRadius,
      outerRadius,
      cx,
      cy,
      rootComponent: Root,
      pointComponent: Point,
      ...restProps
    } = this.props;
    return (
      <Plugin name="PieSeries">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
                series,
                data,
                layouts,
              }) => {
                const {
                  width, height,
                } = layouts[placeholder];
              const { valueField } = findSeriesByName(name, series);
              const arcs = pieAttributes(
                valueField,
                data,
                width,
                height,
                innerRadius,
                outerRadius,
              );
                return (
                  <Root x={cx || width / 2} y={cy || height / 2}>
                    {
                      arcs.map(item =>
                        (
                          <Point
                            key={item}
                            x={0}
                            y={0}
                            d={item}
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

PieSeries.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  pointComponent: PropTypes.func.isRequired,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
};

PieSeries.defaultProps = {
  placeholder: 'pane',
  innerRadius: 0,
  outerRadius: undefined,
  cx: undefined,
  cy: undefined,
};
