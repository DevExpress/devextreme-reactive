import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { filterOperations } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { DataTypeProvider } from './data-type-provider';


jest.mock('@devexpress/dx-grid-core', () => ({
  filterOperations: jest.fn(),
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
    filterOperations.mockImplementation(() => ({ test: ['a', 'b'] }));
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

  it('should define the "availableFilterOperations" getter', () => {
    const deps = {
      getter: {
        availableFilterOperations: () => {},
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({}, deps)}
        <DataTypeProvider
          for={['test']}
          availableFilterOperations={['a', 'b']}
        />
      </PluginHost>
    ));
    expect(getComputedState(tree).availableFilterOperations)
      .toEqual({ test: ['a', 'b'] });
  });
});
