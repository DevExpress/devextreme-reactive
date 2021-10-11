import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import MenuItem from '@mui/material/MenuItem';
import { OutlinedSelect } from './outlined-select';

describe('AppointmentForm common select', () => {
  let shallow;
  const defaultProps = {
    onValueChange: jest.fn(),
    value: '1',
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('OutlinedSelect', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <OutlinedSelect {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should handle change', () => {
      const tree = shallow((
        <OutlinedSelect {...defaultProps} />
      ));

      tree.simulate('change', { target: { value: 'next' } });

      expect(defaultProps.onValueChange)
        .toBeCalledWith('next');
    });
    it('should render items depending on available options', () => {
      const tree = shallow((
        <OutlinedSelect
          {...defaultProps}
          availableOptions={[
            { id: 1, text: '1' },
            { id: 2, text: '2' },
          ]}
        />
      ));

      expect(tree.find(MenuItem))
        .toHaveLength(2);
    });
    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <OutlinedSelect
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});
