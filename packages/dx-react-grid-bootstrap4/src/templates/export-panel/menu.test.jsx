import * as React from 'react';
import { shallow } from 'enzyme';
import { Popover } from '../../../../dx-react-bootstrap4/components';
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

    expect(tree.find(Popover).prop('data'))
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

    expect(tree.find(Popover).props())
      .toMatchObject({
        target,
        toggle: onHide,
      });
  });
});
