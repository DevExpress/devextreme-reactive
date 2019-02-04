import * as React from 'react';
import { mount } from 'enzyme';
import { getAvailableFilterOperationsGetter } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { DataTypeProvider } from './data-type-provider';

jest.mock('@devexpress/dx-grid-core', () => ({
  getAvailableFilterOperationsGetter: jest.fn(),
}));

describe('DataTypeProvider', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    getAvailableFilterOperationsGetter.mockImplementation(() => () => ['a', 'b']);
  });

  // tslint:disable-next-line: max-line-length
  it('should define the "valueFormatter" with correct predicate if "formatterComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          formatterComponent={() => null}
        />
      </PluginHost>
    ));

    const valueFormatter = tree.findWhere(n => n.prop('name') === 'valueFormatter').last();

    expect(valueFormatter.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueEditor').exists())
      .toBeFalsy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  // tslint:disable-next-line: max-line-length
  it('should define the "valueEditor" with correct predicate if "editorComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          editorComponent={() => null}
        />
      </PluginHost>
    ));

    const valueEditor = tree.findWhere(n => n.prop('name') === 'valueEditor').last();

    expect(valueEditor.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueFormatter').exists())
      .toBeFalsy();
    expect(valueEditor.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueEditor.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  it('should define the "getAvailableFilterOperations" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <DataTypeProvider
          for={['test']}
          getAvailableFilterOperations={() => {}}
        />
      </PluginHost>
    ));
    expect(getComputedState(tree).getAvailableFilterOperations)
      .toEqual(expect.any(Function));
  });
});
