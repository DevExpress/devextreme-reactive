import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Navigator } from './navigator';

describe('DateNavigator', () => {
  let classes;
  let shallow;
  const Title = () => null;
  const defaultProps = {
    currentDate: '2018-07-12',
    titleComponent: Title,
  };
  beforeAll(() => {
    classes = getClasses(<Navigator {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Navigator', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Navigator {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.navigator}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Navigator {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render title', () => {
      const title = shallow((
        <Navigator {...defaultProps} />
      )).find(Title);

      expect(title.exists())
        .toBeTruthy();
      expect(title.prop('currentDate'))
        .toBe('2018-07-12');
    });
  });
});
