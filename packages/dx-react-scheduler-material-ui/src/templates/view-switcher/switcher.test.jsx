import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import { Switcher } from './switcher';

describe('ViewSwitcher', () => {
  let shallow;
  const defaultProps = {
    onChange: jest.fn(),
    currentView: {
      name: 'Test view name',
    },
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

      tree.simulate('change', { target: { value: 'next' } });

      expect(defaultProps.onChange)
        .toBeCalledWith('next');
    });
    it('should render items depend of available view names', () => {
      const tree = shallow((
        <Switcher
          {...defaultProps}
          availableViews={[
            { name: 'Week', displayName: 'Week' },
            { name: 'Month', displayName: 'Month' },
          ]}
        />
      ));

      expect(tree.find(MenuItem))
        .toHaveLength(2);
    });
  });
});
