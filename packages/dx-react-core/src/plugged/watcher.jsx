import React from 'react';
import PropTypes from 'prop-types';
import { argumentsShallowEqual } from '@devexpress/dx-core';
import { UPDATE_CONNECTION } from './property';
import { getAction } from '../utils/plugin-helpers';

function changeDetector(watch, onChange) {
  let lastArg = null;
  return () => {
    const args = watch();
    if (
      lastArg === null ||
      !argumentsShallowEqual(lastArg, args)
    ) {
      onChange(args);
    }
    lastArg = args;
  };
}

export class Watcher extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { pluginHost } = context;
    const property = propertyName => pluginHost.get(`${propertyName}Property`);
    const action = actionName => getAction(pluginHost, actionName);
    const { watch, onChange } = this.props;

    this.detectChanges = changeDetector(
      () => watch(property),
      args => onChange.apply(null, [action, ...args]),
    );

    this.subscription = {
      [UPDATE_CONNECTION]: this.detectChanges,
    };
  }
  componentWillMount() {
    const { pluginHost } = this.context;

    this.detectChanges();
    pluginHost.registerSubscription(this.subscription);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;

    pluginHost.unregisterSubscription(this.subscription);
  }
  render() {
    return null;
  }
}
Watcher.propTypes = {
  watch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
Watcher.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
