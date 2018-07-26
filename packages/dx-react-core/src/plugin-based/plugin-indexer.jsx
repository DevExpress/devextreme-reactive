import * as React from 'react';
import * as PropTypes from 'prop-types';
import { POSITION_CONTEXT } from './constants';

export const PluginIndexer = (
  { children },
  { [POSITION_CONTEXT]: position },
) => (
  <React.Fragment>
    {
      React.Children.map(children, (child, index) => {
        if (!child || !child.type) return child;

        const childPosition = () => {
          const calculatedPosition = (position && position()) || [];
          return [...calculatedPosition, index];
        };

        return (
          <PluginIndexerContext position={childPosition}>
            {child}
          </PluginIndexerContext>
        );
      })
    }
  </React.Fragment>
);

PluginIndexer.propTypes = {
  children: PropTypes.node,
};

PluginIndexer.defaultProps = {
  children: undefined,
};

PluginIndexer.contextTypes = {
  [POSITION_CONTEXT]: PropTypes.func,
};

class PluginIndexerContext extends React.Component {
  getChildContext() {
    const { position } = this.props;
    return {
      [POSITION_CONTEXT]: position,
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

PluginIndexerContext.propTypes = {
  position: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PluginIndexerContext.childContextTypes = {
  [POSITION_CONTEXT]: PropTypes.func,
};
