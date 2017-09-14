import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('Table Select Row', () => {
  const defaultProps = {
    selected: false,
    selectByRowClick: false,
    changeSelected: () => {},
  };

  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should have correct className', () => {
    let tree = mount(<TableSelectRow
      {...defaultProps}
    />);
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = mount(<TableSelectRow
      {...defaultProps}
      selected
    />);
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });

  it('should handle row click', () => {
    const changeSelectedMock = jest.fn();
    const tree = mount(<TableSelectRow
      {...defaultProps}
      changeSelected={changeSelectedMock}
      selectByRowClick
    />);

    tree.find('tr').simulate('click');
    expect(changeSelectedMock).toBeCalled();
  });
});
