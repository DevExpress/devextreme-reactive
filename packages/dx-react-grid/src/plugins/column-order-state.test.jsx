import React from 'react';
import { mount } from 'enzyme';

import { Template, Getter, PluginHost } from '@devexpress/dx-react-core';

import { ColumnOrderState } from './column-order-state';

describe('ColumnOrderState', () => {
  it('should apply the initial column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    let orderedColumns;
    mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <ColumnOrderState
          defaultOrder={['b', 'a']}
        />
        <Template
          name="root"
          connectGetters={getter => (orderedColumns = getter('columns'))}
        >
          <div />
        </Template>
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should apply the column order according to the "order" property in controlled mode', () => {
    let orderedColumns;
    mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <ColumnOrderState
          order={['b', 'a']}
        />
        <Template
          name="root"
          connectGetters={getter => (orderedColumns = getter('columns'))}
        >
          <div />
        </Template>
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should change the column order in uncontrolled mode after the "setColumnOrder" action is fired', () => {
    let orderedColumns;
    let setColumnOrder;
    mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <ColumnOrderState
          defaultOrder={['a', 'b']}
        />
        <Template
          name="root"
          connectGetters={getter => (orderedColumns = getter('columns'))}
          connectActions={action => (setColumnOrder = action('setColumnOrder'))}
        >
          <div />
        </Template>
      </PluginHost>,
    );

    setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should fire the "onOrderChange" callback and preserve the current column order in controlled mode after the "setColumnOrder" action is fired', () => {
    const orderChangeMock = jest.fn();
    let orderedColumns;
    let setColumnOrder;
    mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <ColumnOrderState
          order={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
        <Template
          name="root"
          connectGetters={getter => (orderedColumns = getter('columns'))}
          connectActions={action => (setColumnOrder = action('setColumnOrder'))}
        >
          <div />
        </Template>
      </PluginHost>,
    );

    setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(orderedColumns)
      .toEqual([{ name: 'a' }, { name: 'b' }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });
});
