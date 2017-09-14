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

  it('should define the "valueFormatter" and the "valueEditor" templates', () => {
    const tree = mount(
      <PluginHost>
        <DataTypeProvider />
      </PluginHost>,
    );

    expect(tree.findWhere(n => n.prop('name') === 'valueFormatter').length)
      .toBe(1);
    expect(tree.findWhere(n => n.prop('name') === 'valueEditor').length)
      .toBe(1);
  });

  it('should define templates with correct predicates', () => {
    const tree = mount(
      <PluginHost>
        <DataTypeProvider type="test" />
      </PluginHost>,
    );

    const valueFormatterPredicate = tree.findWhere(n => n.prop('name') === 'valueFormatter')
      .prop('predicate');
    expect(valueFormatterPredicate({ column: { dataType: 'test' } }))
      .toBeTruthy();
    expect(valueFormatterPredicate({ column: { dataType: 'value' } }))
      .toBeFalsy();

    const valueEditorPredicate = tree.findWhere(n => n.prop('name') === 'valueEditor')
      .prop('predicate');
    expect(valueEditorPredicate({ column: { dataType: 'test' } }))
      .toBeTruthy();
    expect(valueEditorPredicate({ column: { dataType: 'value' } }))
      .toBeFalsy();
  });
});
