import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableRow } from './table-row';

describe('TableRow', () => {
  const mountTableRow = ({ tableRow }) => (
    mount(
      <TableRow
        tableRow={tableRow}
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
    let tree = mountTableRow({ tableRow: {} });
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = mountTableRow({ tableRow: { selected: true } });
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });
});
