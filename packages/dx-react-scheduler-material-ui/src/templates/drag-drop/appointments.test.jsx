import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { DraftAppointment, SourceAppointment } from './appointments';

jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    appointment: 'appointment',
  })),
}));

describe('DragDrop', () => {
  const defaultProps = {
    data: {},
    type: 'horizontal',
    fromPrev: false,
    toNext: false,
    formatDate: jest.fn(),
    durationType: 'long',
  };
  describe('DraftAppointment', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <DraftAppointment {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <DraftAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.appointment'))
        .toBeTruthy();
      expect(tree.is('.reducedBrightness'))
        .toBeFalsy();
    });
    it('should reduce its brightness if "isBrightnessReduced" is true', () => {
      const tree = shallow((
        <DraftAppointment
          {...defaultProps}
          isBrightnessReduced
        />
      ));

      expect(tree.is('.reducedBrightness'))
        .toBeTruthy();
    });
  });

  describe('SourceAppointment', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.appointment'))
        .toBeTruthy();
    });
    it('should pass "isBrightnessReduced" to the root component', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} isBrightnessReduced />
      ));

      expect(tree.prop('isBrightnessReduced'))
        .toBeTruthy();
    });
  });
});
