import React from 'react';
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

  it('should define the "valueFormatter" with correct predicate if "formatterTemplate" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          type="test"
          formatterTemplate={() => null}
        />
      </PluginHost>
    ));

    const valueFormatter = tree.findWhere(n => n.prop('name') === 'valueFormatter');

    expect(valueFormatter.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueEditor').exists())
      .toBeFalsy();
    expect(valueFormatter.prop('predicate')({ column: { dataType: 'test' } }))
      .toBeTruthy();
    expect(valueFormatter.prop('predicate')({ column: { dataType: 'value' } }))
      .toBeFalsy();
  });

  it('should define the "valueEditor" with correct predicate if "editorTemplate" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          type="test"
          editorTemplate={() => null}
        />
      </PluginHost>
    ));

    const valueEditor = tree.findWhere(n => n.prop('name') === 'valueEditor');

    expect(valueEditor.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueFormatter').exists())
      .toBeFalsy();
    expect(valueEditor.prop('predicate')({ column: { dataType: 'test' } }))
      .toBeTruthy();
    expect(valueEditor.prop('predicate')({ column: { dataType: 'value' } }))
      .toBeFalsy();
  });
});
