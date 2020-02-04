import * as React from 'react';
import { mount } from 'enzyme';
import { GridSizer } from './grid-sizer';
import { TABLE_STUB_TYPE } from '@devexpress/dx-grid-core';

describe('GridSizer', () => {
  it('should render original Sizer', () => {
    const containerComponent = 'div';
    const onSizeChange = () => 0;
    const tree = mount(
      <GridSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
      />,
    );

    expect(tree.find('Sizer').props()).toEqual({
      onSizeChange,
      containerComponent: 'div',
    });
  });

  it('should call "onSizeChange" after update columns include the stub', () => {
    const containerComponent = 'div';
    const onSizeChange = jest.fn();
    const tree = mount(
      <GridSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
        collapsedGrid={{
          columns: [{ type: 'a' }],
          rows: [{ type: 'a' }],
        }}
      />,
    );
    onSizeChange.mockClear();

    tree.setProps({
      collapsedGrid: {
        columns: [{ type: TABLE_STUB_TYPE }],
        rows: [{ type: 'a' }],
      },
    });

    expect(onSizeChange).toBeCalled();
  });

  it('should call "onSizeChange" after update rows include the stub', () => {
    const containerComponent = 'div';
    const onSizeChange = jest.fn();
    const tree = mount(
      <GridSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
        collapsedGrid={{
          columns: [{ type: 'a' }],
          rows: [{ type: 'a' }],
        }}
      />,
    );
    onSizeChange.mockClear();

    tree.setProps({
      collapsedGrid: {
        columns: [{ type: 'a' }],
        rows: [{ type: TABLE_STUB_TYPE }],
      },
    });

    expect(onSizeChange).toBeCalled();
  });

  it('should not call "onSizeChange" after update columns/rows not include the stub', () => {
    const containerComponent = 'div';
    const onSizeChange = jest.fn();
    const tree = mount(
      <GridSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
        collapsedGrid={{
          columns: [{ type: 'a' }],
          rows: [{ type: 'a' }],
        }}
      />,
    );
    onSizeChange.mockClear();

    tree.setProps({
      collapsedGrid: {
        columns: [{ type: 'b' }],
        rows: [{ type: 'c' }],
      },
    });

    expect(onSizeChange).not.toBeCalled();
  });
});
