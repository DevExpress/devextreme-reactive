import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Label, classes } from './label';

describe('Vertical view TimeScale', () => {
  const defaultProps = {
    time: new Date(2018, 6, 7, 16, 20),
    formatDate: () => undefined,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Label', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Label {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.label}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Label {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should call date format function', () => {
      const formatDate = jest.fn();
      formatDate.mockImplementation(() => 'time');
      const tree = shallow((
        <Label {...defaultProps} formatDate={formatDate} />
      ));

      expect(formatDate)
        .toHaveBeenCalledWith(defaultProps.time, { hour: 'numeric', minute: 'numeric' });
      expect(tree.find(`.${classes.text}`).props().children)
        .toBeTruthy();
    });
    it('shouldn\'t call date format function if time prop is undefined', () => {
      const formatDate = jest.fn();
      formatDate.mockImplementation(() => 'time');
      const tree = shallow((
        <Label {...defaultProps} formatDate={formatDate} time={undefined} />
      ));

      expect(formatDate)
        .not.toHaveBeenCalledWith(defaultProps.time, { hour: 'numeric', minute: 'numeric' });
      expect(tree.find(`.${classes.text}`).exists())
        .toBeFalsy();
      expect(tree.is(`.${classes.emptyLabel}`))
        .toBeTruthy();
    });
  });
});
