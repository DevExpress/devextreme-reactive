import React from 'react';
import PropTypes from 'prop-types';
import { PluginIndexer } from './plugin-indexer';

export class PluginContainer extends React.PureComponent {
  componentWillMount() {
    const { pluginHost, positionContext: position } = this.context;
    const { pluginName, dependencies } = this.props;
    this.plugin = {
      position,
      pluginName,
      dependencies,
      container: true,
    };
    pluginHost.registerPlugin(this.plugin);
  }
  componentWillUpdate() {
    this.context.pluginHost.ensureDependencies();
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterPlugin(this.plugin);
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
  pluginName: '',
  dependencies: [],
};

PluginContainer.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
  positionContext: PropTypes.func.isRequired,
};
