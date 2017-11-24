import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />
    ));

    expect(tree.find('input').getDOMNode().indeterminate)
      .toBeTruthy();
  });

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find('input').simulate('change');

    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        onToggle={onToggle}
      />
    ));
    tree.find('input').simulate('change');

    expect(onToggle)
      .toHaveBeenCalledTimes(1);
  });
});
