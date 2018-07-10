import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { appointmentRects, getAppointments } from '@devexpress/dx-scheduler-core';
import { Appointments } from './appointments';

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => <div>{children}</div>;
const Appointment = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
  containerComponent: Container,
};

const defaultDeps = {
  getter: {
    dateTableRef: {
      querySelectorAll: () => {},
    },
    data: [{ startDate: new Date(2018, 6, 24), endDate: new Date(2018, 5, 5) }],
  },
  template: {
    main: {},
  },
};

jest.mock('@devexpress/dx-scheduler-core', () => ({
  appointmentRects: jest.fn(),
  getAppointments: jest.fn(),
}));

describe('Appointments', () => {
  beforeEach(() => {
    appointmentRects.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
    getAppointments.mockImplementation(() => [
      { start: new Date(2018, 6, 24), end: new Date(2018, 5, 5) },
    ]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "getAppointmentTitle" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
          getTitle={() => 'a'}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getAppointmentTitle())
      .toBe('a');
  });

  it('should provide the "getAppointmentStartDate" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
          getStartDate={() => '2018-07-05'}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getAppointmentStartDate())
      .toBe('2018-07-05');
  });

  it('should provide the "getAppointmentEndDate" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
          getEndDate={() => '2018-07-05'}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getAppointmentEndDate())
      .toBe('2018-07-05');
  });

  it('should provide the "appointmentRects" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
          getEndDate={() => '2018-07-05'}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).appointmentRects)
      .toEqual([{
        x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
      }]);
  });

  it('should provide the "getAppointment" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).appointments)
      .toEqual([
        { start: new Date(2018, 6, 24), end: new Date(2018, 5, 5) },
      ]);
  });

  it('should render container', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(Container).exists())
      .toBeTruthy();
  });

  it('should render appointments', () => {
    const appointment = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
          getTitle={() => 'a'}
          getEndDate={() => '2018-07-05'}
          getStartDate={() => '2018-07-06'}
        />
      </PluginHost>
    )).find(Appointment);

    const {
      appointment: appointmentData,
      x, y, width, height,
      getTitle, getEndDate, getStartDate,
    } = appointment.props();

    expect(appointment).toHaveLength(1);
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(width).toBe(100);
    expect(height).toBe(150);
    expect(appointmentData).toBe('data');
    expect(getTitle()).toBe('a');
    expect(getEndDate()).toBe('2018-07-05');
    expect(getStartDate()).toBe('2018-07-06');
  });
});
