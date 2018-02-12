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
    expect(tree.find('tr').hasClass('active')).toBeFalsy();

    tree = shallow(<TableSelectRow
      {...defaultProps}
      selected
    />);
    expect(tree.find('tr').hasClass('active')).toBeTruthy();
  });

  it('should handle row click', () => {
    const onToggleMock = jest.fn();
    const tree = shallow(<TableSelectRow
      {...defaultProps}
      onToggle={onToggleMock}
      selectByRowClick
    />);

    tree.find('tr').prop('onClick')({ stopPropagation: () => {} });
    expect(onToggleMock).toBeCalled();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSelectRow
        {...defaultProps}
        selected
        className="custom-class"
      />
    ));

    expect(tree.is('.active'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectRow
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
