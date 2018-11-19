import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginIndexer } from './plugin-indexer';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';

export class PluginBase extends React.PureComponent {
  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: position } = this.props;
    const { name, dependencies } = this.props;
    this.plugin = {
      position,
      name,
      dependencies,
      container: true,
    };
    pluginHost.registerPlugin(this.plugin);
  }

  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.ensureDependencies();
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
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

PluginBase.propTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  dependencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    optional: PropTypes.bool,
  })),
};

PluginBase.defaultProps = {
  name: '',
  dependencies: [],
};

export const Plugin = withHostAndPosition(PluginBase);
