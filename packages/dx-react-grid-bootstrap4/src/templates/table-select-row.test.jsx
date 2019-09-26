import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('Table Select Row', () => {
  const defaultProps = {
    selected: false,
    selectByRowClick: false,
    onToggle: () => {},
  };
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct className', () => {
    let tree = shallow(<TableSelectRow
      {...defaultProps}
    />);
    expect(tree.find('tr').hasClass('table-active')).toBeFalsy();

    tree = shallow(<TableSelectRow
      {...defaultProps}
      selected
    />);
    expect(tree.find('tr').hasClass('table-active')).toBeTruthy();
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <TableSelectRow className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should handle row click', () => {
    const onToggleMock = jest.fn();
    const event = { stopPropagation: jest.fn() };
    const tree = shallow(<TableSelectRow
      {...defaultProps}
      onToggle={onToggleMock}
      selectByRowClick
    />);

    tree.find('tr').simulate('click', event);
    expect(onToggleMock).toBeCalled();
  });
});
