import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Item } from './item';

describe('ViewSwitcher', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('Item', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Item className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Item data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should handle item lick', () => {
      const props = {
        onItemClick: jest.fn(),
        onHide: jest.fn(),
      };
      const tree = shallow((
        <Item {...props} />
      ));

      tree.simulate('click');

      // eslint-disable-next-line react/destructuring-assignment
      expect(props.onItemClick)
        .toBeCalled();
      // eslint-disable-next-line react/destructuring-assignment
      expect(props.onHide)
        .toBeCalled();
    });
  });
});
