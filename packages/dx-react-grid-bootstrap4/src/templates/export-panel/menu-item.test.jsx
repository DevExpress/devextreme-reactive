import * as React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from './menu-item';

describe('ExportMenuItem', () => {
  const defaultProps = { text: 'test' };

  it('should render text', () => {
    const tree = shallow(<MenuItem {...defaultProps} />);

    expect(tree.find('button').prop('children'))
      .toEqual('test');
  });

  it('should assign onClick handler', () => {
    const onClick = () => {};
    const tree = shallow((
      <MenuItem
        {...defaultProps}
        onClick={onClick}
      />
    ));

    expect(tree.find('button').prop('onClick'))
      .toBe(onClick);
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <MenuItem
        {...defaultProps}
        className="test"
      />
    ));

    expect(tree.is('.dx-g-bs4-cursor-pointer.dropdown-item.test'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <MenuItem
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find('button').prop('data'))
      .toEqual({ a: 1 });
  });
});
