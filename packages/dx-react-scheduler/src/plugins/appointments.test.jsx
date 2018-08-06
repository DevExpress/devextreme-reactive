import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { Appointments } from './appointments';

// eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
const Container = ({ children }) => <div>{children}</div>;
const Appointment = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
  containerComponent: Container,
};

const defaultDeps = {
  getter: {
    appointmentRects: [{
      top: 10, left: 20, width: 60, height: 150, dataItem: 'data', type: 'horizontal',
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
      style, type,
      getTitle, getEndDate, getStartDate,
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
  });
});
