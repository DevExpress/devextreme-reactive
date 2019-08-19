import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { getRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';
import { Daily } from './layouts/daily';
import { Weekly } from './layouts/weekly';
import { Monthly } from './layouts/monthly';
import { Yearly } from './layouts/yearly';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    radioGroupEditorComponent: () => null,
    switcherComponent: () => null,
    groupedButtonsComponent: () => null,
    dateAndTimeEditorComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    onAppointmentFieldChange: jest.fn(),
    getMessage: jest.fn(),
    changedAppointment: {},
    frequency: 'daily',
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
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

      const radioGroup = tree.find(defaultProps.radioGroupEditorComponent);
      expect(radioGroup)
        .toHaveLength(1);
    });

    it('should render Daily layout correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps}><div /></Layout>
      ));

      const daiy = tree.find(Daily);
      expect(daiy)
        .toHaveLength(1);
    });

    it('should render Weekly layout correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps} frequency="weekly"><div /></Layout>
      ));

      const weekly = tree.find(Weekly);
      expect(weekly)
        .toHaveLength(1);
    });

    it('should render Monthly layout correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps} frequency="monthly"><div /></Layout>
      ));

      const monthly = tree.find(Monthly);
      expect(monthly)
        .toHaveLength(1);
    });

    it('should render Yearly layout correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps} frequency="yearly"><div /></Layout>
      ));

      const yearly = tree.find(Yearly);
      expect(yearly)
        .toHaveLength(1);
    });

    it('should handle recurrence options change', () => {
      const tree = shallow((
        <Layout {...defaultProps}><div /></Layout>
      ));


      tree.find(Daily).at(0).simulate('recurrenceOptionsChange', 'abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith('abc');

      tree.find(defaultProps.radioGroupEditorComponent).at(0).simulate('recurrenceOptionsChange', 'bcd');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith('bcd');
    });

    it('should handle appointment field change', () => {
      const tree = shallow((
        <Layout {...defaultProps}><div /></Layout>
      ));

      tree.find(Daily).at(0).simulate('appointmentFieldChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toHaveBeenCalledWith('abc');
    });

    it('should have getMessage called with proper parameters', () => {
      shallow((
        <Layout {...defaultProps}><div /></Layout>
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('endRepeatLabel');
    });
  });
});
