import React from 'react';
import { mount } from 'enzyme';

import { Template, Getter, PluginHost } from '@devexpress/dx-react-core';

import { ColumnOrderState } from './column-order-state';

describe('ColumnOrderState', () => {
  it('should apply initial columns order specified in the "defaultOrder" property in uncontrolled mode', () => {
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
        />
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should apply columns order according to the "order" property in controlled mode', () => {
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
        />
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should change columns order in uncontrolled mode after the "setColumnOrder" action was fired', () => {
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
        />
      </PluginHost>,
    );

    setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should fire the "onOrderChange" callback and preserve current order in controlled mode after the "setColumnOrder" action was fired', () => {
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
        />
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
