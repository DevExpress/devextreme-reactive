import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import { Switcher } from './switcher';

describe('ViewSwitcher', () => {
  let shallow;
  const defaultProps = {
    onItemClick: jest.fn(),
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('Switcher', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Switcher {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should handle change', () => {
      const tree = shallow((
        <Switcher {...defaultProps} />
      ));

      tree.simulate('change', { target: { value: '' } });

      expect(defaultProps.onItemClick)
        .toBeCalled();
    });
    it('should render items depend of available views', () => {
      const tree = shallow((
        <Switcher {...defaultProps} availableViews={['Week', 'Month']} />
      ));

      expect(tree.find(MenuItem))
        .toHaveLength(2);
    });
  });
});
