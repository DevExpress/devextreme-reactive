import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { Appointments } from './appointments';

// eslint-disable-next-line react/prop-types
const Appointment = ({ children }) => <div>{ children }</div>;
const AppointmentContent = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
  appointmentContentComponent: AppointmentContent,
};

jest.mock('@devexpress/dx-core', () => ({
  ...require.requireActual('@devexpress/dx-core'),
  createClickHandlers: jest.fn(),
}));

const defaultDeps = {
  getter: {
    mapAppointmentData: jest.fn().mockImplementation(() => ({
      title: 'a',
      endDate: '2018-07-05',
      startDate: '2018-07-06',
    })),
  },
  template: {
    appointment: {
      onClick: 'onClick',
      onDoubleClick: 'onDoubleClick',
      style: {
        height: 150,
        width: '60%',
        transform: 'translateY(10px)',
        left: '20%',
        position: 'absolute',
      },
      type: 'horizontal',
      data: 'data',
    },
  },
};

describe('Appointments', () => {
  beforeEach(() => {
    createClickHandlers.mockImplementation((click, dblClick) => ({
      onClick: click,
      onDoubleClick: dblClick,
    }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render appointments', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));
    const appointment = tree.find(Appointment);
    const appointmentContent = tree.find(AppointmentContent);
    const { style, data: appointmentData } = appointment.props();
    const {
      data: appointmentContentData, type, mapAppointmentData,
    } = appointmentContent.props();
    expect(appointment).toHaveLength(1);
    expect(appointmentContent).toHaveLength(1);

    expect(style).toEqual({
      height: 150,
      width: '60%',
      transform: 'translateY(10px)',
      left: '20%',
      position: 'absolute',
    });

    expect(appointmentData).toBe('data');
    expect(appointmentContentData).toBe('data');
    expect(type).toBe('horizontal');
    expect(mapAppointmentData().title).toBe('a');
    expect(mapAppointmentData().endDate).toBe('2018-07-05');
    expect(mapAppointmentData().startDate).toBe('2018-07-06');
  });

  it('should pass correct event handlers', () => {
    const appointment = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    )).find(Appointment);

    expect(createClickHandlers)
      .toHaveBeenCalledWith(
        defaultDeps.template.appointment.onClick,
        defaultDeps.template.appointment.onDoubleClick,
      );

    const {
      onClick, onDoubleClick,
    } = appointment.props();

    expect(onClick).toBe('onClick');
    expect(onDoubleClick).toBe('onDoubleClick');
  });
});
