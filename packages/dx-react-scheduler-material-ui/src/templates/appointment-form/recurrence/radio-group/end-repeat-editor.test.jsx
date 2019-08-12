import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import { getRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { EndRepeatEditor } from './end-repeat-editor';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    dateAndTimeEditorComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    getMessage: jest.fn(),
    changedAppointment: {
      startDate: new Date(),
      endDate: new Date(),
      rRule: 'RRULE:FREQ=YEARLY',
    },
  };
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init => [init, setState]));
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<EndRepeatEditor {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
    getRecurrenceOptions.mockImplementation(() => ({}));
  });
  afterEach(() => {
    mount.cleanUp();
    jest.clearAllMocks();
  });
  describe('EndRepeatEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EndRepeatEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = mount((
        <EndRepeatEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(3);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(1).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(2).is(`.${classes.afterLabel}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();

      const dateAndTimeEditorComponent = tree.find(defaultProps.dateAndTimeEditorComponent);
      expect(dateAndTimeEditorComponent)
        .toHaveLength(1);
      expect(dateAndTimeEditorComponent.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
    });

    it('should handle recurrence options change', () => {
      const tree = mount((
        <EndRepeatEditor {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0).prop('onValueChange')('abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          count: 'abc',
        });

      tree.find(defaultProps.dateAndTimeEditorComponent).at(0).prop('onFirstDateValueChange')('abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          until: 'abc',
        });
    });

    it('should handle switching and call a handler with correct parameters', () => {
      const tree = shallow((
        <EndRepeatEditor {...defaultProps} />
      ));

      tree.prop('onChange')({ target: { value: 'never' } });
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
        });

      tree.prop('onChange')({ target: { value: 'endBy' } });
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          until: defaultProps.changedAppointment.startDate,
        });

      tree.prop('onChange')({ target: { value: 'endAfter' } });
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          count: 1,
        });
    });

    it('should call getMessage with proper parameters', () => {
      shallow((
        <EndRepeatEditor {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('never');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('onLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('occurencesLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('afterLabel');
    });
  });
});
