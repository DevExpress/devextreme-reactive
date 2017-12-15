import React from 'react';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  it('should render Toolbar', () => {
    const ToolbarComponent = () => null;
    const tree = mount((
      <PluginHost>
        <Toolbar
          toolbarComponent={ToolbarComponent}
          flexibleSpaceComponent={() => null}
        />
        <TemplatePlaceholder name="header" />
      </PluginHost>
    ));

    expect(tree.find(ToolbarComponent).exists())
      .toBeTruthy();
  });

  it('should render flexible space', () => {
    const FlexibleSpaceComponent = () => null;
    const tree = mount((
      <PluginHost>
        <Toolbar
          toolbarComponent={() => null}
          flexibleSpaceComponent={FlexibleSpaceComponent}
        />
        <TemplatePlaceholder name="toolbarContent" />
      </PluginHost>
    ));

    expect(tree.find(FlexibleSpaceComponent).exists())
      .toBeTruthy();
  });
});
