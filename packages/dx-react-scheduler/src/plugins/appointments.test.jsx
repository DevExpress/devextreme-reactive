import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { Appointments } from './appointments';

const Appointment = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
};

const defaultDeps = {
  getter: {
    getAppointmentTitle: () => 'a',
    getAppointmentEndDate: () => '2018-07-05',
    getAppointmentStartDate: () => '2018-07-06',
  },
  template: {
    appointment: {
      type: 'horizontal',
      appointment: 'data',
      style: {
        height: 150,
        width: '60%',
        transform: 'translateY(10px)',
        left: '20%',
        position: 'absolute',
      },
    },
  },
};

describe('Appointments', () => {
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
      style, type,
      getAppointmentTitle, getAppointmentEndDate, getAppointmentStartDate, onClick,
    } = appointment.props();

    expect(appointment).toHaveLength(1);
    expect(type).toBe('horizontal');
    expect(style).toEqual({
      height: 150,
      width: '60%',
      transform: 'translateY(10px)',
      left: '20%',
      position: 'absolute',
    });
    expect(appointmentData).toBe('data');
    expect(getAppointmentTitle()).toBe('a');
    expect(getAppointmentEndDate()).toBe('2018-07-05');
    expect(getAppointmentStartDate()).toBe('2018-07-06');
    expect(onClick).toBeUndefined();
  });
});
