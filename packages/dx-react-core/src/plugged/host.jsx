import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginContainer } from './container';
import { Template } from './template';
import { TemplatePlaceholder } from './template-placeholder';

export class PluginHost extends React.PureComponent {
  constructor(props) {
    super(props);

    this.host = new PluginHostCore();
  }
  getChildContext() {
    return {
      pluginHost: this.host,
    };
  }
  render() {
    const { children } = this.props;

    return (
      <div>
        <PluginContainer>
          <Template name="root" />
          {children}
        </PluginContainer>
        <TemplatePlaceholder name="root" />
      </div>
    );
  }
}
PluginHost.defaultProps = {
  children: null,
};
PluginHost.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
PluginHost.childContextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
