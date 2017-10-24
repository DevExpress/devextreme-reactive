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
    const tree = mount((
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />
    ));

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount((
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('can get focus', () => {
    const tree = mount((
      <TableGroupCell />
    ));

    expect(tree.find('td').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" key down', () => {
    const toggleGroupExpanded = jest.fn();
    const tree = mount((
      <TableGroupCell
        toggleGroupExpanded={toggleGroupExpanded}
      />
    ));

    tree.find('td').simulate('keydown', { keyCode: 13 });
    expect(toggleGroupExpanded)
      .toHaveBeenCalled();

    toggleGroupExpanded.mockClear();
    tree.find('td').simulate('keydown', { keyCode: 31 });
    expect(toggleGroupExpanded)
      .not.toHaveBeenCalled();
  });
});
