import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '../utils/shallow-equal';
import { UPDATE_CONNECTION } from './getter';
import { getAction } from '../utils/plugin-helpers';

export class TemplateConnector extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.mappedBindings(props);

    this.subscription = {
      [UPDATE_CONNECTION]: () => this.setState(this.mappedBindings(this.props)),
    };
  }
  componentDidMount() {
    this.updateConnection();
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.mappedBindings(nextProps));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props.params, nextProps.params)
        || !shallowEqual(this.state.props, nextState.props)
        || this.props.content !== nextProps.content;
  }
  componentDidUpdate() {
    this.updateConnection();
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  updateConnection() {
    const { pluginHost } = this.context;
    if (this.props.mapProps) {
      pluginHost.registerSubscription(this.subscription);
    } else {
      pluginHost.unregisterSubscription(this.subscription);
    }
  }
  mappedBindings(props) {
    const { mapProps, mapActions, params } = props;
    const { pluginHost } = this.context;

    let mappedProps = {};
    if (mapProps) {
      mappedProps = mapProps(name => pluginHost.get(`${name}Getter`), params);
    }

    let mappedActions = {};
    if (mapActions) {
      mappedActions = mapActions(name => getAction(pluginHost, name), params);
    }

    return {
      props: mappedProps,
      actions: mappedActions,
    };
  }
  render() {
    const { content, params } = this.props;
    const { props, actions } = this.state;

    const mapped = Object.assign({}, params, props, actions);
    if (React.isValidElement(content)) {
      return React.cloneElement(content, mapped);
    }
    return content ? content(mapped) : null;
  }
}
TemplateConnector.defaultProps = {
  name: null,
  params: null,
  mapProps: null,
  mapActions: null,
  content: null,
};
TemplateConnector.propTypes = {
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mapProps: PropTypes.func,
  mapActions: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  content: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};
TemplateConnector.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
