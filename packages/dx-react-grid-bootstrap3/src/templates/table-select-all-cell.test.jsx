import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableHeaderCell', () => {
  configure({ adapter: new Adapter() });
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = mount(
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />,
    );

    expect(tree.find('input').instance().indeterminate)
      .toBeTruthy();
  });

  it('should call the `toggleAll` function on cell click if selection is available', () => {
    const toggleAll = jest.fn();
    const tree = mount(
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        selectionAvailable
        toggleAll={toggleAll}
      />,
    );
    tree.find('input').simulate('change');

    expect(toggleAll)
      .toHaveBeenCalledTimes(1);
  });
});
