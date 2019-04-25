import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Text } from './text';

jest.mock('moment', () => () => ({ format: () => 'July 2018' }));

describe('Calendar', () => {
  let classes;
  let shallow;
  const defaultProps = {
    currentDate: '2018-07-12',
    formatDate: () => '',
  };
  beforeAll(() => {
    classes = getClasses(<Text {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('Text', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Text {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.text}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Text {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should call date format function', () => {
      const formatDate = jest.fn();
      shallow((
        <Text {...defaultProps} formatDate={formatDate} />
      ));

      expect(formatDate)
        .toHaveBeenCalledWith(new Date(defaultProps.currentDate), { month: 'long', year: 'numeric' });
    });
  });
});
