import React from 'react';
import { mount, shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableSelectAllCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />
    ));

    expect(tree.find('input').getDOMNode().indeterminate)
      .toBeTruthy();
  });

  it('should call the `toggleAll` function on cell click if selection is available', () => {
    const toggleAll = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        selectionAvailable
        toggleAll={toggleAll}
      />
    ));
    tree.find('input').simulate('change');

    expect(toggleAll)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
