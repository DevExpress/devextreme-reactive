import * as React from 'react';
import { shallow } from 'enzyme';
import { Menu as MenuMUI } from '@mui/material';
import { Menu } from './menu';

describe('ExportMenu', () => {
  const defaultProps = {
    onHide: () => {},
    children: <span className="test" />,
  };

  it('should render children', () => {
    const tree = shallow((
      <Menu {...defaultProps} />
    ));

    expect(tree.find('.test'))
      .toBeTruthy();
  });

  it('should pass props to the root element', () => {
    const tree = shallow((
      <Menu
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find(MenuMUI).prop('data'))
      .toEqual({ a: 1 });
  });

  it('should pass target and handler to the root element', () => {
    const target = {};
    const onHide = () => {};
    const tree = shallow((
      <Menu
        {...defaultProps}
        target={target}
        onHide={onHide}
      />
    ));

    expect(tree.find(MenuMUI).props())
      .toMatchObject({
        anchorEl: target,
        onClose: onHide,
      });
  });
});
