import React from 'react';
import PropTypes from 'prop-types';
import { UPDATE_CONNECTION } from './getter';
import {
  isTrackedDependenciesChanged,
  getAvaliableGetters,
  getAvaliableActions,
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
    const { children } = this.props;
    const { pluginHost } = this.context;

    const { getters, trackedDependencies } = getAvaliableGetters(pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvaliableActions(pluginHost);

    return children(getters, actions);
  }
}

TemplateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateConnector.defaultProps = {
  children: null,
};

TemplateConnector.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
