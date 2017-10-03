import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'material-ui';
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
      <Table>
        <TableGroupCell
          column={{ title: 'Title' }}
          row={{ value: 'Value' }}
        />
      </Table>,
    );

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount(
      <Table>
        <TableGroupCell>
          <span className="test" />
        </TableGroupCell>
      </Table>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
