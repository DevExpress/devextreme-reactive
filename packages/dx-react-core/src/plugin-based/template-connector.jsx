import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PLUGIN_HOST_CONTEXT, UPDATE_CONNECTION_EVENT } from './constants';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helpers';

export class TemplateConnector extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.trackedDependencies = {};
    this.subscription = {
      [UPDATE_CONNECTION_EVENT]: () => this.updateConnection(),
    };
  }

  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.registerSubscription(this.subscription);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }

  updateConnection() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;

    if (isTrackedDependenciesChanged(pluginHost, this.trackedDependencies)) {
      this.forceUpdate();
    }
  }

  render() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    const { children } = this.props;

    const { getters, trackedDependencies } = getAvailableGetters(pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(pluginHost);

    return children(getters, actions);
  }
}

TemplateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateConnector.contextTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
};
