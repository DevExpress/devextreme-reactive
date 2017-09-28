import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { TableColumnReordering } from './table-column-reordering';

const defaultDeps = {
  getter: {
    tableColumns: [{ column: { name: 'a' } }, { column: { name: 'b' } }],
  },
  plugins: ['TableView'],
};

describe('TableColumnReordering', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          defaultOrder={['b', 'a']}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'b' } }, { column: { name: 'a' } }]);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          order={['b', 'a']}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'b' } }, { column: { name: 'a' } }]);
  });

  it('should fire the "onOrderChange" callback and should change the column order in uncontrolled mode after the "moveColumn" action is fired', () => {
    const orderChangeMock = jest.fn();

    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          defaultOrder={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
      </PluginHost>,
    );

    getComputedState(tree).actions.moveColumn({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'b' } }, { column: { name: 'a' } }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });

  it('should fire the "onOrderChange" callback and apply the column order specified in the "order" property in controlled mode after the "moveColumn" action is fired', () => {
    const orderChangeMock = jest.fn();

    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          order={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
      </PluginHost>,
    );

    getComputedState(tree).actions.moveColumn({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'a' } }, { column: { name: 'b' } }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });
});
