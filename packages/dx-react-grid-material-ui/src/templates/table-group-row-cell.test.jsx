import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should render column title and value', () => {
    const tree = mount(
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />,
    );

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount(
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
