import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { ColumnOrderState } from './column-order-state';

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
  },
};

describe('ColumnOrderState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnOrderState
          defaultOrder={['b', 'a']}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.columns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnOrderState
          order={['b', 'a']}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.columns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should fire the "onOrderChange" callback and should change the column order in uncontrolled mode after the "setColumnOrder" action is fired', () => {
    const orderChangeMock = jest.fn();

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnOrderState
          defaultOrder={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
      </PluginHost>
    ));

    getComputedState(tree).actions.setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(getComputedState(tree).getters.columns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });

  it('should fire the "onOrderChange" callback and apply the column order specified in the "order" property in controlled mode after the "setColumnOrder" action is fired', () => {
    const orderChangeMock = jest.fn();

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnOrderState
          order={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
      </PluginHost>
    ));

    getComputedState(tree).actions.setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(getComputedState(tree).getters.columns)
      .toEqual([{ name: 'a' }, { name: 'b' }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });
});
