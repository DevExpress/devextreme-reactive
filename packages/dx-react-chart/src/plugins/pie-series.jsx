import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pieAttributes, seriesData } from '@devexpress/dx-chart-core';

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
      colorField,
      ...restProps
    } = this.props;
    const getSeriesDataComputed = ({ series }) =>
      seriesData(series, {
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
                argumentField,
              );

                return (
                      arcs.map(({
                        value, d, data: dataItem,
                      }) =>
                        (
                          <Point
                            fill={dataItem[colorField]}
                            key={dataItem[argumentField]}
                            x={cx || widthPane / 2}
                            y={cy || heightPane / 2}
                            value={value}
                            d={d}
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
  colorField: PropTypes.string,
};

PieSeries.defaultProps = {
  colorField: 'color',
  name: 'defaultSeriesName',
  innerRadius: 0,
  outerRadius: undefined,
  cx: undefined,
  cy: undefined,
};
