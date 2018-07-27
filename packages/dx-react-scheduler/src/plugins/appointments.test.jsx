import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { Appointments } from './appointments';

// eslint-disable-next-line
const Container = ({ children }) => <div>{children}</div>;
const VerticalAppointment = () => null;
const HorizontalAppointment = () => null;

const defaultProps = {
  verticalAppointmentComponent: VerticalAppointment,
  horizontalAppointmentComponent: HorizontalAppointment,
  containerComponent: Container,
};

const defaultDeps = {
  getter: {
    appointmentRects: [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data', type: 'horizontal',
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
    )).find(HorizontalAppointment);

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

  it('should render appointment component depend of appointment type', () => {
    const deps = {
      ...defaultDeps,
      getter: {
        ...defaultDeps.getters,
        appointmentRects: [{
          x: 1, y: 2, width: 100, height: 150, dataItem: 'data', type: 'vertical',
        }],
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(VerticalAppointment).exists())
      .toBeTruthy();
  });
});
