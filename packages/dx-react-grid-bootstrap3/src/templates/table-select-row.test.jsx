import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('Table Select Row', () => {
  const mountTableRow = ({ tableRow, changeSelected, selectByRowClick }) => (
    mount(
      <TableSelectRow
        tableRow={tableRow}
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
    let tree = mountTableRow({ tableRow: { selected: false } });
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = mountTableRow({ tableRow: { selected: true } });
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });

  it('should handle row click', () => {
    const changeSelectedMock = jest.fn();
    const tree = mountTableRow({ changeSelected: changeSelectedMock, selectByRowClick: true });

    tree.find('tr').simulate('click');

    expect(changeSelectedMock).toBeCalled();
  });
});
