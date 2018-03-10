import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const Root = ({
  width, height, children, ...restProps
}) => ((
  <svg width={width} height={height} {...restProps}>
    {children}
  </svg>));

Root.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Root.defaultProps = {
  children: null,
};

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data,
      width,
      height,
      margin,
      ...restProps
    } = this.props;

    return (
      <Plugin>
        <Getter name="data" value={data} />
        <Getter name="height" value={height} />
        <Getter name="width" value={width} />
        <Getter name="margin" value={margin} />
        <Template name="root">
          <Root width={width} height={height} {...restProps}>
            <TemplatePlaceholder name="axis" />
            <TemplatePlaceholder name="pane" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.number,
};

ChartCore.defaultProps = {
  margin: 40,
};
