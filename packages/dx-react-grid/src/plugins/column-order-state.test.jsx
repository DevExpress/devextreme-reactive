import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, Getter, PluginHost } from '@devexpress/dx-react-core';

import { ColumnOrderState } from './column-order-state';

describe('ColumnOrderState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
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
          connectGetters={(getter) => { orderedColumns = getter('columns'); }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
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
          connectGetters={(getter) => { orderedColumns = getter('columns'); }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should fire the "onOrderChange" callback and should change the column order in uncontrolled mode after the "setColumnOrder" action is fired', () => {
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
          defaultOrder={['a', 'b']}
          onOrderChange={orderChangeMock}
        />
        <Template
          name="root"
          connectGetters={(getter) => { orderedColumns = getter('columns'); }}
          connectActions={(action) => { setColumnOrder = action('setColumnOrder'); }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    setColumnOrder({
      sourceColumnName: 'a',
      targetColumnName: 'b',
    });

    expect(orderedColumns)
      .toEqual([{ name: 'b' }, { name: 'a' }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });

  it('should fire the "onOrderChange" callback and apply the column order specified in the "order" property in controlled mode after the "setColumnOrder" action is fired', () => {
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
          connectGetters={(getter) => { orderedColumns = getter('columns'); }}
          connectActions={(action) => { setColumnOrder = action('setColumnOrder'); }}
        >
          {() => <div />}
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
