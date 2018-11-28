import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { TemplatePlaceholder } from './template-placeholder';
import { PluginHostContext } from './contexts';

export class PluginHost extends React.PureComponent {
  constructor(props) {
    super(props);

    this.host = new PluginHostCore();
  }

  render() {
    const { children } = this.props;

    return (
      <PluginHostContext.Provider value={this.host}>
        <PluginIndexer>
          {children}
        </PluginIndexer>
        <TemplatePlaceholder name="root" />
      </PluginHostContext.Provider>
    );
  }
}

PluginHost.propTypes = {
  children: PropTypes.node,
};

PluginHost.defaultProps = {
  children: undefined,
};
