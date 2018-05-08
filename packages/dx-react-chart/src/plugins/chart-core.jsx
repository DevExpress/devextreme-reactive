import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { argumentAxisName } from '@devexpress/dx-chart-core';

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data,
      axes,
      series,
      width,
      height,
      rootComponent: Root,
      ...restProps
    } = this.props;
    const argumentAxis = argumentAxisName(series);

    return (
      <Plugin>
        <Getter name="originalData" value={data} />
        <Getter name="axes" value={axes} />
        <Getter name="originalSeries" value={series} />
        <Getter name="argumentAxisName" value={argumentAxis} />
        <Template name="root">
          <Root width={width} height={height} {...restProps}>
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
  axes: PropTypes.array,
  series: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rootComponent: PropTypes.func.isRequired,
};

ChartCore.defaultProps = {
  axes: [],
};
