import * as React from 'react';
import * as PropTypes from 'prop-types';

export const INDEXABLE_COMPONENT = Symbol('indexableComponent');

export const PluginIndexer = (
  { children },
  { positionContext },
) => (
  <React.Fragment>
    {
      React.Children.map(children, (child, index) => {
        if (!child || !child.type) return child;

        const childPosition = () => {
          const calculatedPosition =
            (positionContext && positionContext()) || [];
          return [...calculatedPosition, index];
        };

        if (child.type[INDEXABLE_COMPONENT] === true) {
          return React.cloneElement(child, { position: childPosition });
        }

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
  positionContext: PropTypes.func,
};

class PluginIndexerContext extends React.Component {
  getChildContext() {
    return {
      positionContext: this.props.position,
    };
  }
  render() {
    return this.props.children;
  }
}

PluginIndexerContext.propTypes = {
  position: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PluginIndexerContext.childContextTypes = {
  positionContext: PropTypes.func,
};
