import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { DraftAppointment, SourceAppointment } from './appointments';

jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    appointment: 'appointment',
    shadedAppointment: 'shadedAppointment',
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
      expect(tree.is('.shadedAppointment'))
        .toBeFalsy();
    });
    it('should be shaded if "isShaded" is true', () => {
      const tree = shallow((
        <DraftAppointment
          {...defaultProps}
          isShaded
        />
      ));

      expect(tree.is('.shadedAppointment'))
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
    it('should pass "isShaded" to the root component', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} isShaded />
      ));

      expect(tree.prop('isShaded'))
        .toBeTruthy();
    });
  });
});
