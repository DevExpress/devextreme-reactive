import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TodayButton } from './today-button';

describe('TodayButton', () => {
  let shallow;
  const defaultProps = {
    setCurrentDate: jest.fn(),
    getMessage: jest.fn(),
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('Button', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TodayButton {...defaultProps} data={{ testData: 'testData' }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });

    it('should handle click', () => {
      const tree = shallow((
        <TodayButton {...defaultProps} />
      ));

      tree.simulate('click', { target: { value: 'any' } });
      expect(defaultProps.setCurrentDate)
        .toBeCalledWith(expect.any(Object));
    });

    it('should call getMessage function with proper parameter', () => {
      shallow((
        <TodayButton {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toBeCalledWith('today');
    });

    it('should render combine user and standard style classes', () => {
      const classes = getClasses(<TodayButton />);
      const tree = shallow((
        <TodayButton {...defaultProps} className="custom-class" />
      ));
      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
    });
  });
});
