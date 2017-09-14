import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('Table Select Row', () => {
  const mountTableRow = ({ selected, changeSelected, selectByRowClick }) => (
    mount(
      <TableSelectRow
        selected={selected}
        changeSelected={changeSelected}
        selectByRowClick={selectByRowClick}
      />,
    )
  );

  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should have correct className', () => {
    let tree = mountTableRow({ selected: false });
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = mountTableRow({ selected: true });
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });

  it('should handle row click', () => {
    const changeSelectedMock = jest.fn();
    const tree = mountTableRow({ changeSelected: changeSelectedMock, selectByRowClick: true });

    tree.find('tr').simulate('click');

    expect(changeSelectedMock).toBeCalled();
  });
});
