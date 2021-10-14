import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { getRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';
import { Daily } from './layouts/daily';
import { Weekly } from './layouts/weekly';
import { Monthly } from './layouts/monthly';
import { Yearly } from './layouts/yearly';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
}));
jest.mock('./layouts/daily', () => ({
  Daily: () => null,
}));
jest.mock('./layouts/weekly', () => ({
  Weekly: () => null,
}));
jest.mock('./layouts/monthly', () => ({
  Monthly: () => null,
}));
jest.mock('./layouts/yearly', () => ({
  Yearly: () => null,
}));

describe('AppointmentForm recurrence', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    radioGroupComponent: () => null,
    selectComponent: () => null,
    weeklyRecurrenceSelectorComponent: () => null,
    dateEditorComponent: () => null,
    onFieldChange: jest.fn(),
    getMessage: jest.fn(),
    appointmentData: { rRule: 'rrule' },
    formatDate: jest.fn(),
    firstDayOfWeek: 0,
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Layout {...defaultProps} />);
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({ freq: 3 }));
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps}><div /></Layout>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps}><div /></Layout>
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(2);
      expect(labels.at(0).is(`.${classes.repeatLabel}`))
        .toBeTruthy();
      expect(labels.at(1).is(`.${classes.endRepeatLabel}`))
        .toBeTruthy();

      const radioGroup = tree.find(defaultProps.radioGroupComponent);
      expect(radioGroup)
        .toHaveLength(1);

      const select = tree.find(defaultProps.selectComponent);
      expect(select)
        .toHaveLength(1);
      expect(select.at(0).is(`.${classes.select}`))
        .toBeTruthy();
    });

    it('should render Daily layout correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(Daily))
        .toHaveLength(1);
    });

    it('should render Weekly layout correctly', () => {
      getRecurrenceOptions.mockImplementation(() => ({ freq: 2 }));
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(Weekly))
        .toHaveLength(1);
    });

    it('should render Monthly layout correctly', () => {
      getRecurrenceOptions.mockImplementation(() => ({ freq: 1 }));
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(Monthly))
        .toHaveLength(1);
    });

    it('should render Yearly layout correctly', () => {
      getRecurrenceOptions.mockImplementation(() => ({ freq: 0 }));
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(Yearly))
        .toHaveLength(1);
    });

    it('should handle appointment field change', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      tree.find(Daily).at(0).simulate('fieldChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith('abc');

      tree.find(defaultProps.radioGroupComponent).at(0).simulate('fieldChange', 'bcd');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith('bcd');
    });

    it('should have call getMessage with proper parameters', () => {
      shallow((
        <Layout {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('endRepeatLabel');
    });

    it('should render nothing if rRule is not defined', () => {
      const tree = shallow((
        <Layout {...defaultProps} appointmentData={{}} />
      ));

      expect(tree.find(`.${classes.root}`).exists())
        .toBe(false);
    });
  });
});
