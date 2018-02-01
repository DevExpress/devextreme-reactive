import React from 'react';
import PropTypes from 'prop-types';
import { PluginIndexer } from './plugin-indexer';

export class Plugin extends React.PureComponent {
  componentWillMount() {
    const { pluginHost, positionContext: position } = this.context;
    const { name, dependencies } = this.props;
    this.plugin = {
      position,
      name,
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

Plugin.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  dependencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    optional: PropTypes.bool,
  })),
};

Plugin.defaultProps = {
  name: '',
  dependencies: [],
};

Plugin.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
  positionContext: PropTypes.func.isRequired,
};
