import * as React from 'react';
import { shallow } from 'enzyme';
import MenuItemMUI from '@mui/material/MenuItem';
import { MenuItem } from './menu-item';

describe('ExportMenuItem', () => {
  const defaultProps = { text: 'test' };

  it('should render text', () => {
    const tree = shallow(<MenuItem {...defaultProps} />);

    expect(tree.find(MenuItemMUI).prop('children'))
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

    expect(tree.find(MenuItemMUI).prop('onClick'))
      .toBe(onClick);
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <MenuItem
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find(MenuItemMUI).prop('data'))
      .toEqual({ a: 1 });
  });
});
