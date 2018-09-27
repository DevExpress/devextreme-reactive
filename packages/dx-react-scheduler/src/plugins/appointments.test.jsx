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
      getTitle, getEndDate, getStartDate, onClick,
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
    expect(getTitle()).toBe('a');
    expect(getEndDate()).toBe('2018-07-05');
    expect(getStartDate()).toBe('2018-07-06');
    expect(onClick).toBeUndefined();
  });

  it('should pass the onClick handler to appointment', () => {
    const toggleTooltipVisibilityMock = jest.fn();
    const setTooltipAppointmentMetaMock = jest.fn();
    const { onClick } = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          action: {
            toggleTooltipVisibility: toggleTooltipVisibilityMock,
            setTooltipAppointmentMeta: setTooltipAppointmentMetaMock,
          },
        })}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    )).find(Appointment).props();
    const onClickArgs = { target: 'target', appointment: 'appt' };

    onClick(onClickArgs);

    expect(toggleTooltipVisibilityMock)
      .toBeCalled();
    expect(setTooltipAppointmentMetaMock.mock.calls[0][0])
      .toMatchObject(onClickArgs);
  });
});
