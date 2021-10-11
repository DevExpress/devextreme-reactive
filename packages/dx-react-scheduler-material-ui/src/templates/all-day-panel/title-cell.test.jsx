import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';

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
    it('should call getMessage with proper parameters', () => {
      const getMessage = jest.fn();
      shallow((
        <TitleCell getMessage={getMessage} />
      ));

      expect(getMessage)
        .toHaveBeenCalledWith('allDay');
    });
    it('should render title with fixed height', () => {
      const tree = shallow((
        <TitleCell fixedHeight {...defaultProps} />
      ));

      expect(tree.is(`.${classes.fixedHeight}`))
        .toBeTruthy();
      expect(tree.find(`.${classes.fixedHeight}`))
        .toHaveLength(2);
    });
  });
});
