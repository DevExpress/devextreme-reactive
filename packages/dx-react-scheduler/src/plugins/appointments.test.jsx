import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { Appointments } from './appointments';

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => (
  <div>
    {children}
  </div>
);
const Appointment = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
  containerComponent: Container,
};

const defaultDeps = {
  getter: {
    appointmentRects: [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }],
    getAppointmentTitle: () => 'a',
    getAppointmentEndDate: () => '2018-07-05',
    getAppointmentStartDate: () => '2018-07-06',
  },
  template: {
    main: {},
  },
};

describe('Appointments', () => {
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
