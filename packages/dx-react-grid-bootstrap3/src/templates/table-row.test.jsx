import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableRow } from './table-row';

describe('TableRow', () => {
  const mountTableRow = ({ row }) => (
    mount(
      <TableRow
        row={row}
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
    let tree = mountTableRow({ row: {} });
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = mountTableRow({ row: { selected: true } });
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });
});
