import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Text } from './text';

jest.mock('moment', () => () => ({ format: () => 'July 2018' }));

describe('Calendar', () => {
  let classes;
  let shallow;
  const defaultProps = {
    currentDate: '2018-07-12',
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
    it('should render current date', () => {
      const currentDate = shallow((
        <Text {...defaultProps} />
      )).dive().dive().text();

      expect(currentDate)
        .toBe('July 2018');
    });
  });
});
