import * as React from 'react';
import { createMount } from '@mui/material/test-utils';
import {
  END_REPEAT_RADIO_GROUP,
  MONTHLY_RADIO_GROUP,
  YEARLY_RADIO_GROUP,
  getRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';
import { RadioGroup } from './radio-group';
import { EndRepeatEditor } from './end-repeat-editor';
import { MonthlyEditor } from './monthly-editor';
import { YearlyEditor } from './yealy-editor';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
}));
jest.mock('./monthly-editor', () => ({
  MonthlyEditor: () => null,
}));
jest.mock('./yealy-editor', () => ({
  YearlyEditor: () => null,
}));
jest.mock('./end-repeat-editor', () => ({
  EndRepeatEditor: () => null,
}));

describe('AppointmentForm recurrence radio group', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    switcherComponent: () => null,
    dateAndTimeEditorComponent: () => null,
    dateEditorComponent: () => null,
    selectComponent: () => null,
    type: '',
    onFieldChange: jest.fn(),
    getMessage: jest.fn(() => ''),
    formatDate: jest.fn(() => ''),
    appointmentData: {
      startDate: new Date(),
      endDate: new Date(),
    },
    id: END_REPEAT_RADIO_GROUP,
    firstDayOfWeek: 0,
  };
  let mount;
  beforeEach(() => {
    mount = createMount();
    getRecurrenceOptions.mockImplementation(() => ({}));
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('RadioGroup', () => {
    it('should pass rest props into the root element', () => {
      const tree = mount((
        <RadioGroup data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render EndRepeatEditor correctly', () => {
      const tree = mount((
        <RadioGroup {...defaultProps} type={END_REPEAT_RADIO_GROUP} />
      ));

      const endRepeat = tree.find(EndRepeatEditor);
      expect(endRepeat)
        .toHaveLength(1);
    });

    it('should render MonthlyEditor correctly', () => {
      const tree = mount((
        <RadioGroup {...defaultProps} type={MONTHLY_RADIO_GROUP} />
      ));

      const monthlyEditor = tree.find(MonthlyEditor);
      expect(monthlyEditor)
        .toHaveLength(1);
    });

    it('should render YearlyEditor correctly', () => {
      const tree = mount((
        <RadioGroup {...defaultProps} type={YEARLY_RADIO_GROUP} />
      ));

      const yearlyEditor = tree.find(YearlyEditor);
      expect(yearlyEditor)
        .toHaveLength(1);
    });

    it('should work even if rule is undefined', () => {
      const tree = mount((
        <RadioGroup {...defaultProps} />
      ));

      expect(tree.exists())
        .toBeTruthy();
    });
  });
});
