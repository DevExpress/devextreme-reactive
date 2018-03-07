import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PLUGIN_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT, INDEXABLE_COMPONENT } from './constants';

let globalTemplateId = 0;
export class Template extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    globalTemplateId += 1;
    this.id = globalTemplateId;
  }
  componentWillMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    const { name } = this.props;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Template`]: {
        id: this.id,
        predicate: params => (this.props.predicate ? this.props.predicate(params) : true),
        children: () => this.props.children,
      },
    };
    pluginHost.registerPlugin(this.plugin);
  }
  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.broadcast(RERENDER_TEMPLATE_EVENT, this.id);
  }
  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}

Template[INDEXABLE_COMPONENT] = true;

Template.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  predicate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
};

Template.defaultProps = {
  predicate: undefined,
  children: undefined,
  position: undefined,
};

Template.contextTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
};
