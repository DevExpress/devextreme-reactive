import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

export class Action extends React.PureComponent {
  componentWillMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: positionContext } = this.context;
    const { name } = this.props;

    this.plugin = {
      position: () => positionContext(),
      [`${name}Action`]: (params) => {
        const { action } = this.props;
        const { getters } = getAvailableGetters(
          pluginHost,
          getterName => pluginHost.get(`${getterName}Getter`, this.plugin),
        );
        let nextParams = params;
        const actions = getAvailableActions(
          pluginHost,
          actionName => (actionName === name
            ? (newParams) => { nextParams = newParams; }
            : pluginHost.collect(`${actionName}Action`, this.plugin).slice().reverse()[0]),
        );
        action(params, getters, actions);
        const nextAction = pluginHost.collect(`${name}Action`, this.plugin).slice().reverse()[0];
        if (nextAction) {
          nextAction(nextParams);
        }
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }

  render() {
    return null;
  }
}

Action.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

Action.contextTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
};
