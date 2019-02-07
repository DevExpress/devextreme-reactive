import * as React from 'react';
import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { TemplatePlaceholder } from './template-placeholder';
import { PluginHostContext } from './contexts';

export interface PluginHostProps {
  /** Plugin React elements. */
  children: React.ReactNode;
}

/** @internal */
class PluginHostBase extends React.PureComponent<PluginHostProps> {
  host: PluginHostCore;

  constructor(props: PluginHostProps) {
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

export const PluginHost: React.ComponentType<PluginHostProps> = PluginHostBase;
