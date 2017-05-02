import React from 'react';
import PropTypes from 'prop-types';
import { Getter } from './getter';
import { Action } from './action';
import { Template } from './template';

const CONTAINER_CONTEXT = 'pluginContainerContext';

export const PluginContainer = (
  { children },
  { [CONTAINER_CONTEXT]: containerContext },
) => (
  <div style={{ display: 'none' }}>
    {
      React.Children.map(children, (child, index) => {
        if (!child || !child.type) return child;

        const childPosition = () => {
          const calculatedPosition =
            (containerContext && containerContext()) || [];
          return [...calculatedPosition, index];
        };

        if (child.type === Getter ||
            child.type === Action ||
            child.type === Template) {
          return React.cloneElement(child, { position: childPosition });
        }

        return (
          <PluginContainerContext position={childPosition}>
            {child}
          </PluginContainerContext>
        );
      })
    }
  </div>
);

PluginContainer.defaultProps = {
  children: null,
};

PluginContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PluginContainer.contextTypes = {
  [CONTAINER_CONTEXT]: PropTypes.func,
};

class PluginContainerContext extends React.Component {
  getChildContext() {
    return {
      [CONTAINER_CONTEXT]: this.props.position,
    };
  }
  render() {
    return this.props.children;
  }
}

PluginContainerContext.propTypes = {
  position: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PluginContainerContext.childContextTypes = {
  [CONTAINER_CONTEXT]: PropTypes.func,
};
