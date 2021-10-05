import * as React from 'react';
import { create } from 'react-test-renderer';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  it('should render Toolbar', () => {
    const Root = () => null;
    const tree = create((
      <PluginHost>
        <Toolbar
          rootComponent={Root}
          flexibleSpaceComponent={() => null}
        />
        <TemplatePlaceholder name="header" />
      </PluginHost>
    ));

    expect(tree.root.findByType(Root)).not.toBeNull();
  });

  it('should render flexible space', () => {
    const FlexibleSpaceComponent = () => null;
    const tree = create((
      <PluginHost>
        <Toolbar
          rootComponent={() => null}
          flexibleSpaceComponent={FlexibleSpaceComponent}
        />
        <TemplatePlaceholder name="toolbarContent" />
      </PluginHost>
    ));

    expect(tree.root.findByType(FlexibleSpaceComponent)).not.toBeNull();
  });
});
