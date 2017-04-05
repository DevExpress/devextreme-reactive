import React from 'react';

const getAction = (pluginHost, actionName) => {
  const actions = pluginHost.collect(`${actionName}Action`).reverse();
  return params => actions.forEach(action => action(params));
};

export class Action extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    this.plugin = {
      [`${name}Action`]: (params) => {
        const { action } = this.props;
        action(params, actionName => getAction(pluginHost, actionName));
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}
Action.propTypes = {
  name: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};
Action.contextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
