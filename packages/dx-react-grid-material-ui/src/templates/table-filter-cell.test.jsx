import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { Table } from 'material-ui';
import { setupConsole } from '@devexpress/dx-testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should use the \'Filter...\' placeholder', () => {
    const tree = mount(
      <Table>
        <TableFilterCell
          column={{
            name: 'Test',
          }}
        />
      </Table>,
    );

    expect(tree.find('Input').prop('placeholder')).toBe('Filter...');
  });

  it('should not set filter with an empty value', () => {
    const setFilterMock = jest.fn();
    const tree = mount(
      <Table>
        <TableFilterCell
          column={{
            name: 'Test',
          }}
          setFilter={setFilterMock}
          value={'abc'}
        />
      </Table>,
    );

    tree.find('input').simulate('change', { target: { value: '' } });
    expect(setFilterMock.mock.calls[0][0]).toBeNull();
  });

  it('should render children if passed', () => {
    const tree = mount(
      <Table>
        <TableFilterCell>
          <span className="test" />
        </TableFilterCell>
      </Table>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
