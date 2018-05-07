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
      pointComponent: Point,
      ...restProps
    } = this.props;
    return (
      <Plugin name="PieSeries">
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
                series,
                data,
                layouts,
                width, height,
              }) => {
                const {
                  width: widthPane, height: heightPane,
                } = layouts[placeholder] || { width, height };
              const { valueField } = findSeriesByName(name, series);
              const arcs = pieAttributes(
                valueField,
                data,
                widthPane,
                heightPane,
                innerRadius,
                outerRadius,
              );
                return (
                      arcs.map(item =>
                        (
                          <Point
                            key={item}
                            x={cx || widthPane / 2}
                            y={cy || heightPane / 2}
                            d={item}
                            {...restProps}
                          />
                        ))
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
