import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { ExportPanel } from './export-panel';

describe('ExportPanel', () => {
  const DefaultButton = () => null;

  it('should pass the startExport function to the buttonComponent', () => {
    const startExport = () => {};
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <ExportPanel
          buttonComponent={DefaultButton}
          startExport={startExport}
        />
      </PluginHost>
    ));

    expect(tree.find(DefaultButton).prop('startExport'))
      .toBe(startExport);
  });

  it('should pass correct getMessage function to the buttonComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <ExportPanel
          buttonComponent={DefaultButton}
          messages={{
            export: 'Export grid',
          }}
        />
      </PluginHost>
    ));

    const getMessage = tree.find(DefaultButton)
      .prop('getMessage');

    expect(getMessage('export'))
      .toBe('Export grid');
  });
});
