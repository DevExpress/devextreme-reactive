import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { END_REPEAT_RADIO_GROUP, MONTHLY_RADIO_GROUP, YEARLY_RADIO_GROUP } from '@devexpress/dx-scheduler-core';
import { RadioGroupEditor } from './radio-group-editor';
import { EndRepeatEditor } from './end-repeat-editor';
import { MonthlyEditor } from './monthly-editor';
import { YearlyEditor } from './yealy-editor';

describe('AppointmentForm recurrence radio group', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    switcherComponent: () => null,
    dateAndTimeEditorComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    recurrenceOptions: {},
    getMessage: jest.fn(),
    changedAppointment: {
      startDate: new Date(),
      endDate: new Date(),
    },
    id: END_REPEAT_RADIO_GROUP,
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('RadioGroupEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <RadioGroupEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render EndRepeatEditor correctly', () => {
      const tree = mount((
        <RadioGroupEditor {...defaultProps} id={END_REPEAT_RADIO_GROUP} />
      ));

      const endRepeat = tree.find(EndRepeatEditor);
      expect(endRepeat)
        .toHaveLength(1);
    });

    it('should render MonthlyEditor correctly', () => {
      const tree = mount((
        <RadioGroupEditor {...defaultProps} id={MONTHLY_RADIO_GROUP} />
      ));

      const monthlyEditor = tree.find(MonthlyEditor);
      expect(monthlyEditor)
        .toHaveLength(1);
    });

    it('should render YearlyEditor correctly', () => {
      const tree = mount((
        <RadioGroupEditor {...defaultProps} id={YEARLY_RADIO_GROUP} />
      ));

      const yearlyEditor = tree.find(YearlyEditor);
      expect(yearlyEditor)
        .toHaveLength(1);
    });
  });
});
