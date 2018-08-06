import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pieAttributes, seriesData, palette } from '@devexpress/dx-chart-core';

export class PieSeries extends React.PureComponent {
  render() {
    const {
      name,
      innerRadius,
      outerRadius,
      cx,
      cy,
      pointComponent: Point,
      valueField,
      argumentField,
      ...restProps
    } = this.props;
    const getSeriesDataComputed = ({ series }) => seriesData(series, {
      valueField, argumentField, name,
    });
    return (
      <Plugin name="PieSeries">
        <Getter name="series" computed={getSeriesDataComputed} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              data,
              layouts,
            }) => {
              const {
                width: widthPane, height: heightPane,
              } = layouts.pane;

              const arcs = pieAttributes(
                valueField,
                data,
                widthPane,
                heightPane,
                innerRadius,
                outerRadius,
              );
              const colors = palette(Array.from(arcs));
              return (
                arcs.map((item, index) => (
                  <Point
                    fill={colors[index].themeColor}
                    key={item.value}
                    x={cx || widthPane / 2}
                    y={cy || heightPane / 2}
                    value={item.value}
                    d={item.d}
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
  name: PropTypes.string,
  pointComponent: PropTypes.func.isRequired,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
  valueField: PropTypes.string.isRequired,
  argumentField: PropTypes.string.isRequired,
};

PieSeries.defaultProps = {
  name: 'defaultSeriesName',
  innerRadius: 0,
  outerRadius: undefined,
  cx: undefined,
  cy: undefined,
};
