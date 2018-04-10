import * as React from 'react';
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
        someSelected
      />
    ));

    expect(tree.find('input').getDOMNode().indeterminate)
      .toBeTruthy();
  });

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableSelectAllCell
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find('input').simulate('change');

    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableSelectAllCell
        onToggle={onToggle}
      />
    ));
    tree.find('input').simulate('change', { stopPropagation: jest.fn() });

    expect(onToggle)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell className="custom-class" />
    ));

    expect(tree.is('.align-middle.dx-g-bs4-cursor-pointer.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell data={{ a: 1 }} />
    ));
    expect(tree.find('th').prop('data'))
      .toMatchObject({ a: 1 });
  });
});
