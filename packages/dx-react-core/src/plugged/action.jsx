import React from 'react';

export class Action extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Action`]: (params) => {
        const { action } = this.props;
        action(params);
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
  position: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};
Action.defaultProps = {
  position: () => NaN,
};
Action.contextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
