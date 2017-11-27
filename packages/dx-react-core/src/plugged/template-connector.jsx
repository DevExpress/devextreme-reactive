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

    this.prepareForRendering();
  }
  componentWillReceiveProps(props) {
    this.prepareForRendering(props);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  prepareForRendering(props) {
    const children = props ? props.children : this.props.children;
    const { pluginHost } = this.context;

    const { getters, trackedDependencies } = getAvailableGetters(pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(pluginHost);

    this.setState({ children: children(getters, actions) });
  }
  updateConnection() {
    const { pluginHost } = this.context;

    if (isTrackedDependenciesChanged(pluginHost, this.trackedDependencies)) {
      this.prepareForRendering();
      this.forceUpdate();
    }
  }
  render() {
    return this.state.children;
  }
}
TemplateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateConnector.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
