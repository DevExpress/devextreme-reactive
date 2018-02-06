import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { DataTypeProvider } from './data-type-provider';

describe('DataTypeProvider', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should define the "valueFormatter" with correct predicate if "formatterComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          formatterComponent={() => null}
        />
      </PluginHost>
    ));

    const valueFormatter = tree.findWhere(n => n.prop('name') === 'valueFormatter');

    expect(valueFormatter.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueEditor').exists())
      .toBeFalsy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  it('should define the "valueEditor" with correct predicate if "editorComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          editorComponent={() => null}
        />
      </PluginHost>
    ));

    const valueEditor = tree.findWhere(n => n.prop('name') === 'valueEditor');

    expect(valueEditor.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueFormatter').exists())
      .toBeFalsy();
    expect(valueEditor.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueEditor.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });
});
