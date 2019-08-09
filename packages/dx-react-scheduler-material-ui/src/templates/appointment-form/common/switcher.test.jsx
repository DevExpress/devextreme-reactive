import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import { Switcher } from './switcher';

describe('AppointmentForm common', () => {
  let shallow;
  const defaultProps = {
    onChange: jest.fn(),
    value: '1',
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

    it('should render items depending on available options', () => {
      const tree = shallow((
        <Switcher
          {...defaultProps}
          availableOptions={[
            { text: '1', id: 1 },
            { text: '2', id: 2 },
            { text: '3', id: 3 },
          ]}
        />
      ));

      expect(tree.find(MenuItem))
        .toHaveLength(3);
    });
  });
});
