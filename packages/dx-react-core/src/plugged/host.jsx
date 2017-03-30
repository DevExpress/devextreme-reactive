import React from 'react';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
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
        <Template name="root" />
        {children}
        <TemplatePlaceholder name="root" />
      </div>
    );
  }
}
PluginHost.defaultProps = {
  children: null,
};
PluginHost.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
PluginHost.childContextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
