import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';

class ActionBase extends React.PureComponent {
  constructor(props) {
    super(props);

    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: positionContext } = props;
    const { name } = props;

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
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.unregisterPlugin(this.plugin);
  }

  render() {
    return null;
  }
}

ActionBase.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
};

export const Action = withHostAndPosition(ActionBase);
