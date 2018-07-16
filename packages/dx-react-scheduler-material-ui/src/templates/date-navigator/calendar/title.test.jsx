import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Title } from './title';

jest.mock('moment', () => () => ({ format: () => 'July 2018' }));

describe('Calendar', () => {
  let classes;
  let shallow;
  const defaultProps = {
    currentDate: '2018-07-12',
  };
  beforeAll(() => {
    classes = getClasses(<Title {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('Title', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Title {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.title}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Title {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render current date', () => {
      const currentDate = shallow((
        <Title {...defaultProps} />
      )).dive().dive().text();

      expect(currentDate)
        .toBe('July 2018');
    });
  });
});
