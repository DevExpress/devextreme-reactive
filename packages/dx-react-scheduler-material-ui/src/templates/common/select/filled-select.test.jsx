import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import MenuItem from '@mui/material/MenuItem';
import { FilledSelect } from './filled-select';

describe('AppointmentForm common select', () => {
  let shallow;
  const defaultProps = {
    onValueChange: jest.fn(),
    value: '1',
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('FilledSelect', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <FilledSelect {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should pass className to the root element', () => {
      const classes = getClasses(<FilledSelect {...defaultProps} />);
      const tree = shallow((
        <FilledSelect className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.filledSelect}.custom-class`))
        .toBeTruthy();
    });
    it('should handle change', () => {
      const tree = shallow((
        <FilledSelect {...defaultProps} />
      ));

      tree.simulate('change', { target: { value: 'next' } });

      expect(defaultProps.onValueChange)
        .toBeCalledWith('next');
    });
    it('should render items depending on available options', () => {
      const tree = shallow((
        <FilledSelect
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
        <FilledSelect
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});
