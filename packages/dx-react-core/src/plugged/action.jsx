import React from 'react';
import PropTypes from 'prop-types';
import { INDEXABLE_COMPONENT } from './plugin-indexer';

export class Action extends React.Component {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Action`]: (params, getters, actions) => {
        const { action } = this.props;
        action(params, getters, actions);
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }
  shouldComponentUpdate() {
    return false;
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
