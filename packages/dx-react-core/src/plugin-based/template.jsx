import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  PLUGIN_HOST_CONTEXT, POSITION_CONTEXT,
  RERENDER_TEMPLATE_EVENT, RERENDER_TEMPLATE_SCOPE_EVENT,
} from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';

let globalTemplateId = 0;
class TemplateBase extends React.PureComponent {
  constructor(props) {
    super(props);

    globalTemplateId += 1;
    this.id = globalTemplateId;

    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: positionContext } = props;
    const { name, predicate } = props;

    this.plugin = {
      position: () => positionContext(),
      [`${name}Template`]: {
        id: this.id,
        predicate: params => (predicate ? predicate(params) : true),
        children: () => {
          const { children } = this.props;
          return children;
        },
      },
    };
    pluginHost.registerPlugin(this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
  }

  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.broadcast(RERENDER_TEMPLATE_EVENT, this.id);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    const { name } = this.props;
    pluginHost.unregisterPlugin(this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
  }

  render() {
    return null;
  }
}

TemplateBase.propTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  predicate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
};

TemplateBase.defaultProps = {
  predicate: undefined,
  children: undefined,
};

export const Template = withHostAndPosition(TemplateBase);
