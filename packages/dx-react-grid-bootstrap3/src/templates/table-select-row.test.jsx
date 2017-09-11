import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('TableRow', () => {
  const mountTableRow = ({ selected, changeSelected }) => (
    mount(
      <TableSelectRow
        selected={selected}
        changeSelected={changeSelected}
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
    const tree = mountTableRow({ changeSelected: changeSelectedMock });

    tree.find('tr').simulate('click');

    expect(changeSelectedMock).toBeCalled();
  });
});
