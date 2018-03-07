import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginIndexer } from './plugin-indexer';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

export class Plugin extends React.PureComponent {
  componentWillMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: position } = this.context;
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
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.ensureDependencies();
  }
  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
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
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
};
