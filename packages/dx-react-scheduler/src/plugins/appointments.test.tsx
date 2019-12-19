import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { Appointments } from './appointments';
import {
  calculateRectByDateIntervals, getVerticalRectByDates,
  getHorizontalRectByDates, getAppointmentStyle,
} from '@devexpress/dx-scheduler-core';

// eslint-disable-next-line react/prop-types
const Appointment = ({ children }) => <div>{children}</div>;
const AppointmentContent = () => null;
const SplitIndicator = () => null;
const RecurringIcon = () => null;
// eslint-disable-next-line react/prop-types
const Container = ({ children }) => <div>{children}</div>;

const defaultProps = {
  splitIndicatorComponent: SplitIndicator,
  containerComponent: Container,
  appointmentComponent: Appointment,
  appointmentContentComponent: AppointmentContent,
  recurringIconComponent: RecurringIcon,
};

jest.mock('@devexpress/dx-core', () => ({
  ...require.requireActual('@devexpress/dx-core'),
  createClickHandlers: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
}));

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getVerticalRectByDates: jest.fn(),
  getHorizontalRectByDates: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  getAppointmentStyle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    formatDate: jest.fn(),
    viewCellsData: [],
    timeTableAppointments: [[{}]],
    allDayAppointments: [],
    timeTableElementsMeta: { getCellRects: 'getCellRects' },
    allDayElementsMeta: { getCellRects: 'getCellRects' },
    currentView: 'day',
    startViewDate: '',
    endViewDate: '',
    cellDuration: '',
  },
  template: {
    timeTableAppointmentLayer: {},
    allDayAppointmentLayer: {},
  },
};

describe('Appointments', () => {
  beforeEach(() => {
    createClickHandlers.mockImplementation((click, dblClick) => ({
      onClick: click,
      onDoubleClick: dblClick,
    }));
    calculateRectByDateIntervals.mockImplementation(() => [{
      type: 'horizontal',
      dataItem: { test: 'test' },
      fromPrev: false,
      toNext: false,
      durationType: 'long',
      resources: [],
      top: 'test top',
      left: 'test left',
      width: 'test width',
      height: 'test height',
    }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render container component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const container = tree.find(Container);

    expect(container).toHaveLength(2);
    expect(getAppointmentStyle)
      .toHaveBeenCalledTimes(2);
    expect(getAppointmentStyle)
      .toHaveBeenCalledWith({
        top: 'test top',
        left: 'test left',
        width: 'test width',
        height: 'test height',
      });
  });
  it('should render appointment content template', () => {
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
    const { data: firstAppointmentData } = appointment.at(0).props();
    const {
      type, data: appointmentContentData,
      recurringIconComponent, formatDate,
      resources,
    } = appointmentContent.at(0).props();

    expect(appointment).toHaveLength(2);
    expect(appointmentContent).toHaveLength(2);
    expect(type).toBe('horizontal');
    expect(firstAppointmentData).toEqual({ test: 'test' });
    expect(appointmentContentData).toEqual({ test: 'test' });
    expect(resources).toEqual([]);

    expect(recurringIconComponent).toBe(defaultProps.recurringIconComponent);
    expect(formatDate).toBe(defaultDeps.getter.formatDate);
  });
  it('should pass correct event handlers', () => {
    const deps = {
      template: {
        appointment: {
          onClick: 'onClick',
          onDoubleClick: 'onDoubleClick',
        },
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
        {pluginDepsToComponents(deps)}
      </PluginHost>
    ));

    const appointments = tree.find(Appointment);

    expect(createClickHandlers)
      .toHaveBeenCalledWith(
        deps.template.appointment.onClick,
        deps.template.appointment.onDoubleClick,
      );

    const {
      onClick, onDoubleClick,
    } = appointments.at(0).props();

    expect(onClick).toBe('onClick');
    expect(onDoubleClick).toBe('onDoubleClick');
  });
  it('should render appointmentTop template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const appointmentTop = tree.findWhere(node => node.prop('name') === 'appointmentTop').at(0);

    expect(appointmentTop.prop('params')).toEqual({
      type: 'horizontal',
      data: { test: 'test' },
      slice: false,
    });
  });
  it('should render appointmentBottom template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const appointmentTop = tree.findWhere(node => node.prop('name') === 'appointmentBottom').at(0);

    expect(appointmentTop.prop('params')).toEqual({
      slice: false,
      type: 'horizontal',
      data: { test: 'test' },
    });
  });
  it('should render slice start component', () => {
    const deps = {
      template: {
        appointment: {
          fromPrev: true,
          type: 'horizontal',
        },
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const slice = tree.find(SplitIndicator);

    expect(slice.props()).toEqual({
      position: 'start',
      appointmentType: 'horizontal',
    });
  });
  it('should render slice end component', () => {
    const deps = {
      template: {
        appointment: {
          toNext: true,
          type: 'horizontal',
        },
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const slice = tree.find(SplitIndicator);

    expect(slice.props()).toEqual({
      position: 'end',
      appointmentType: 'horizontal',
    });
  });
  it('should render "timeTableAppointmentLayer" template when currentView is not "month"', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const timeTableAppointmentsLayer = tree.findWhere(
      node => node.prop('name') === 'timeTableAppointmentLayer',
    ).at(0);

    expect(timeTableAppointmentsLayer.exists())
      .toBeTruthy();
    expect(calculateRectByDateIntervals)
      .toHaveBeenCalledWith({
        growDirection: 'vertical', multiline: false,
      },
        defaultDeps.getter.timeTableAppointments,
        getVerticalRectByDates,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        cellDuration: defaultDeps.getter.cellDuration,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
      },
      );
  });
  it('should render "timeTableAppointmentLayer" template when currentView is "month"', () => {
    const deps = {
      getter: {
        currentView: {
          type: 'month',
        },
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const timeTableAppointmentsLayer = tree.findWhere(
      node => node.prop('name') === 'timeTableAppointmentLayer',
    ).at(0);

    expect(timeTableAppointmentsLayer.exists())
      .toBeTruthy();
    expect(calculateRectByDateIntervals)
      .toHaveBeenCalledWith(
        { growDirection: 'horizontal', multiline: true },
        defaultDeps.getter.timeTableAppointments,
        getHorizontalRectByDates,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        cellDuration: defaultDeps.getter.cellDuration,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
      },
      );
  });
});
