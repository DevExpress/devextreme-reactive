import React from 'react';
import { argumentsShallowEqual } from '../utils/shallowEqual';
import { UPDATE_CONNECTION } from './getter';

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
    const getter = getterName => pluginHost.get(`${getterName}Getter`);
    const action = actionName => pluginHost.get(`${actionName}Action`);
    const { watch, onChange } = this.props;

    this.detectChanges = changeDetector(
      () => watch(getter),
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
  watch: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
Watcher.contextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
