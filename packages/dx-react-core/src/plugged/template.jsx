import React from 'react';

export const RERENDER_TEMPLATE = 'rerenderTemplate';

let globalTemplateId = 0;
export class Template extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    globalTemplateId += 1;
    this.id = globalTemplateId;
  }
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name, predicate, connectGetters, connectActions } = this.props;

    this.plugin = {
      [`${name}Template`]: {
        predicate,
        connectGetters,
        connectActions,
        children: () => this.props.children,
        id: this.id,
      },
    };
    pluginHost.registerPlugin(this.plugin);
  }
  componentDidUpdate() {
    const { pluginHost } = this.context;
    pluginHost.broadcast(RERENDER_TEMPLATE, this.id);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}
Template.defaultProps = {
  predicate: null,
  connectGetters: null,
  connectActions: null,
  children: null,
};
Template.propTypes = {
  name: React.PropTypes.string.isRequired,
  predicate: React.PropTypes.func,
  connectGetters: React.PropTypes.func,
  connectActions: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
Template.contextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
