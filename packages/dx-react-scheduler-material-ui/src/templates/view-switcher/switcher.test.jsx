import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { Switcher } from './switcher';

describe('ViewSwitcher', () => {
  let shallow;
  const defaultProps = {
    onChange: jest.fn(),
    currentView: {
      name: 'Test view name',
      displayName: 'Test display name',
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

      tree.simulate('valueChange', 'next');

      expect(defaultProps.onChange)
        .toBeCalledWith('next');
    });
  });
});
