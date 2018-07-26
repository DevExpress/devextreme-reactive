import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { TemplatePlaceholder } from './template-placeholder';
import { PLUGIN_HOST_CONTEXT } from './constants';

export class PluginHost extends React.PureComponent {
  constructor(props) {
    super(props);

    this.host = new PluginHostCore();
  }

  getChildContext() {
    return {
      [PLUGIN_HOST_CONTEXT]: this.host,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <PluginIndexer>
          {children}
        </PluginIndexer>
        <TemplatePlaceholder name="root" />
      </React.Fragment>
    );
  }
}

PluginHost.propTypes = {
  children: PropTypes.node,
};

PluginHost.defaultProps = {
  children: undefined,
};

PluginHost.childContextTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
};
