import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const Root = ({ width, height, children }) => ((
  <svg width={width} height={height} >
    {children}
  </svg>));

Root.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
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
    } = this.props;

    return (
      <Plugin>
        <Getter name="data" value={data} />
        <Template name="root">
          <Root width={width} height={height}>
            <TemplatePlaceholder name="axis" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
