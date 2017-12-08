import React from 'react';
import PropTypes from 'prop-types';
import { Getter } from './getter';
import { Action } from './action';
import { Template } from './template';

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

        if (child.type === Getter ||
            child.type === Action ||
            child.type === Template) {
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PluginIndexer.defaultProps = {
  children: null,
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
