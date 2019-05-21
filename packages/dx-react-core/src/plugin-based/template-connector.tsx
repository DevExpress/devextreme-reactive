import * as React from 'react';
import { UPDATE_CONNECTION_EVENT } from './constants';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PluginHostContext } from './contexts';
import { Getters, Actions } from '../types';

export interface TemplateConnectorProps {
  /** A function that renders a markup using Getters and Actions passed as arguments. */
  children: (
    getters: Getters,
    actions: Actions,
  ) => React.ReactNode;
}

/** @internal */
class TemplateConnectorBase extends React.Component<TemplateConnectorProps> {
  trackedDependencies: { [key: string]: { get: (args) => any }};
  subscription: { [UPDATE_CONNECTION_EVENT: string]: (args) => void };

  constructor(props, context) {
    super(props, context);

    this.trackedDependencies = {};
    this.subscription = {
      [UPDATE_CONNECTION_EVENT]: () => this.updateConnection(),
    };
  }

  componentDidMount() {
    const pluginHost = this.context;
    pluginHost.registerSubscription(this.subscription);
  }

  componentWillUnmount() {
    const pluginHost = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }

  updateConnection() {
    const pluginHost = this.context;

    if (isTrackedDependenciesChanged(pluginHost, this.trackedDependencies)) {
      this.forceUpdate();
    }
  }

  render() {
    const pluginHost = this.context;
    const { children } = this.props;

    const { getters, trackedDependencies } = getAvailableGetters(pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(pluginHost);

    return children(getters, actions);
  }
}

TemplateConnectorBase.contextType = PluginHostContext;

/** A React component that provides access to Getters and Actions within a Template. */
export const TemplateConnector: React.ComponentType<TemplateConnectorProps> = TemplateConnectorBase;
