import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';

import { TitleCell } from './title-cell';

describe('AllDayPanel', () => {
  let classes;
  let shallow;
  const defaultProps = {
    getMessage: key => key,
  };
  beforeAll(() => {
    classes = getClasses(<TitleCell {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('TitleCell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TitleCell className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.container}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TitleCell data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should use "All Day" TitleCell', () => {
      const getMessage = jest.fn();
      shallow((
        <TitleCell getMessage={getMessage} />
      ));

      expect(getMessage)
        .toHaveBeenCalledWith('allDay');
    });
  });
});
