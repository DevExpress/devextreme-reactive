import React from 'react';
import { mount } from 'enzyme';

import { Template, Getter, PluginHost } from '@devexpress/dx-react-core';

import { ColumnOrderState } from './column-order-state';

describe('ColumnOrderState', () => {
  it('should apply initial columns order specified in the "defaultOrder" property in uncontrolled mode', () => {
    const columnsMock = jest.fn();
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
          connectGetters={getter => columnsMock(getter('columns'))}
        />
      </PluginHost>,
    );

    expect(columnsMock.mock.calls[0][0])
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should apply columns order according to the "order" property in controlled mode', () => {
    const columnsMock = jest.fn();
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
          connectGetters={getter => columnsMock(getter('columns'))}
        />
      </PluginHost>,
    );

    expect(columnsMock.mock.calls[0][0])
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should change columns order in uncontrolled mode after the "setColumnOrder" action was fired', () => {
    const columnsMock = jest.fn();
    const tree = mount(
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
          connectGetters={getter => ({ mock: columnsMock(getter('columns')) })}
          connectActions={action => ({ setColumnOrder: action('setColumnOrder') })}
        >
          {({ setColumnOrder }) => (
            <button
              onClick={() => setColumnOrder({
                sourceColumnName: 'a',
                targetColumnName: 'b',
              })}
            />
          )}
        </Template>
      </PluginHost>,
    );

    columnsMock.mockReset();
    tree.find('button').simulate('click');

    expect(columnsMock.mock.calls[0][0])
      .toEqual([{ name: 'b' }, { name: 'a' }]);
  });

  it('should fire the "onOrderChange" callback and preserve current order in controlled mode after the "setColumnOrder" action was fired', () => {
    const columnsMock = jest.fn();
    const orderChangeMock = jest.fn();
    const tree = mount(
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
          connectGetters={getter => ({ mock: columnsMock(getter('columns')) })}
          connectActions={action => ({ setColumnOrder: action('setColumnOrder') })}
        >
          {({ setColumnOrder }) => (
            <button
              onClick={() => setColumnOrder({
                sourceColumnName: 'a',
                targetColumnName: 'b',
              })}
            />
          )}
        </Template>
      </PluginHost>,
    );

    columnsMock.mockReset();
    tree.find('button').simulate('click');

    expect(columnsMock.mock.calls[0][0])
      .toEqual([{ name: 'a' }, { name: 'b' }]);
    expect(orderChangeMock.mock.calls[0][0])
      .toEqual(['b', 'a']);
  });
});
