import React from 'react';
import PropTypes from 'prop-types';
import { PluginIndexer } from './indexer';

export class PluginContainer extends React.PureComponent {
  componentWillMount() {
    const { pluginHost, positionContext: position } = this.context;
    const { pluginName, dependencies } = this.props;
    this.plugin = {
      position,
      pluginName,
      dependencies,
    };
    pluginHost.registerPluginContainer(this.plugin);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterPluginContainer(this.plugin);
  }
  render() {
    const { children } = this.props;
    return (
      <PluginIndexer>
        {children}
      </PluginIndexer>
    );
  }
}

PluginContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pluginName: PropTypes.string,
  dependencies: PropTypes.arrayOf(
    PropTypes.shape({
      pluginName: PropTypes.string,
      optional: PropTypes.bool,
    }),
  ),
};

PluginContainer.defaultProps = {
  pluginName: '', // TODO: Should be required
  dependencies: [],
};

PluginContainer.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
  positionContext: PropTypes.func.isRequired,
};
