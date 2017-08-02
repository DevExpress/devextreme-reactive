import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './indexer';
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
        <PluginIndexer>
          <Template name="root" />
          {children}
        </PluginIndexer>
        <TemplatePlaceholder name="root" />
      </div>
    );
  }
}

PluginHost.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PluginHost.defaultProps = {
  children: null,
};

PluginHost.childContextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
