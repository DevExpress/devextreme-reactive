import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';

import { Title } from './title';

describe('AllDayPanel', () => {
  let classes;
  let shallow;
  const defaultProps = {
    getMessage: key => key,
  };
  beforeAll(() => {
    classes = getClasses(<Title {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Title', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Title className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.container}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Title data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should use "All Day" Title', () => {
      const getMessage = jest.fn();
      shallow((
        <Title getMessage={getMessage} />
      ));

      expect(getMessage)
        .toHaveBeenCalledWith('allDay');
    });
  });
});
