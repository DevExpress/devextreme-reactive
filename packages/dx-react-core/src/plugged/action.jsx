import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';
import { INDEXABLE_COMPONENT } from './plugin-indexer';

export class Action extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    this.plugin = {
      position: () => this.props.position(),
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
    const { pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}

Action[INDEXABLE_COMPONENT] = true;

Action.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

Action.defaultProps = {
  position: null,
};

Action.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
