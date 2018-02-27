import React from 'react';
import PropTypes from 'prop-types';
import { UPDATE_CONNECTION } from './getter';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';

export class TemplateConnector extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.trackedDependencies = {};
    this.subscription = {
      [UPDATE_CONNECTION]: () => this.updateConnection(),
    };
  }
  componentWillMount() {
    const { pluginHost } = this.context;
    pluginHost.registerSubscription(this.subscription);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  updateConnection() {
    const { pluginHost } = this.context;

    if (isTrackedDependenciesChanged(pluginHost, this.trackedDependencies)) {
      this.forceUpdate();
    }
  }
  render() {
    const { pluginHost } = this.context;

    const { getters, trackedDependencies } = getAvailableGetters(pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(pluginHost);

    return this.props.children(getters, actions);
  }
}
TemplateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateConnector.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
