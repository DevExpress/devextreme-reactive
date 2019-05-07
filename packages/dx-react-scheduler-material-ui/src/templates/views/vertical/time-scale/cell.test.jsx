import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Cell } from './cell';

describe('Vertical view TimePanel', () => {
  const defaultProps = {
    endDate: new Date(2018, 6, 7, 16, 20),
    formatDate: () => undefined,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Cell {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should call date format function', () => {
      const formatDate = jest.fn();
      formatDate.mockImplementation(() => 'time');
      const tree = shallow((
        <Cell {...defaultProps} formatDate={formatDate} />
      ));

      expect(formatDate)
        .toHaveBeenCalledWith(defaultProps.endDate, { hour: 'numeric', minute: 'numeric' });
      expect(tree.find(`.${classes.text}`).props().children)
        .toBeTruthy();
    });
  });
});
