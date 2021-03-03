import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { Appointments } from './appointments';
import {
  calculateRectByDateAndGroupIntervals, getVerticalRectByAppointmentData,
  getHorizontalRectByAppointmentData, getAppointmentStyle,
  isAllDayElementsMetaActual, isTimeTableElementsMetaActual,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
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
  ...jest.requireActual('@devexpress/dx-core'),
  createClickHandlers: jest.fn(),
}));

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getVerticalRectByAppointmentData: jest.fn(),
  getHorizontalRectByAppointmentData: jest.fn(),
  calculateRectByDateAndGroupIntervals: jest.fn(),
  getAppointmentStyle: jest.fn(),
  isAllDayElementsMetaActual: jest.fn(),
  isTimeTableElementsMetaActual: jest.fn(),
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
    groupByDate: () => 'groupByDate',
  },
  template: {
    timeTableAppointmentLayer: {},
  },
};

describe('Appointments', () => {
  beforeEach(() => {
    createClickHandlers.mockImplementation((click, dblClick) => ({
      onClick: click,
      onDoubleClick: dblClick,
    }));
    calculateRectByDateAndGroupIntervals.mockImplementation(() => [{
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
    isAllDayElementsMetaActual.mockImplementation(() => true);
    isTimeTableElementsMetaActual.mockImplementation(() => true);
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

    expect(container).toHaveLength(1);
    expect(getAppointmentStyle)
      .toHaveBeenCalledTimes(1);
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
    const { data } = appointment.at(0).props();
    const {
      type, data: appointmentContentData,
      recurringIconComponent, formatDate,
      resources,
    } = appointmentContent.at(0).props();

    expect(appointment).toHaveLength(1);
    expect(appointmentContent).toHaveLength(1);
    expect(type).toBe('horizontal');
    expect(data).toEqual({ test: 'test' });
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
    expect(isTimeTableElementsMetaActual)
      .toHaveBeenCalledWith(
        defaultDeps.getter.allDayAppointments,
        defaultDeps.getter.timeTableElementsMeta,
      );
    expect(calculateRectByDateAndGroupIntervals)
      .toHaveBeenCalledWith({
        growDirection: 'vertical', multiline: false,
      },
        defaultDeps.getter.timeTableAppointments,
        getVerticalRectByAppointmentData,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        cellDuration: defaultDeps.getter.cellDuration,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
        placeAppointmentsNextToEachOther: false,
      },
      {
        groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        groupedByDate: 'groupByDate',
        groupCount: 1,
      });
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
    expect(calculateRectByDateAndGroupIntervals)
      .toHaveBeenCalledWith(
        { growDirection: 'horizontal', multiline: true },
        defaultDeps.getter.timeTableAppointments,
        getHorizontalRectByAppointmentData,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        cellDuration: defaultDeps.getter.cellDuration,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
        placeAppointmentsNextToEachOther: false,
      },
      {
        groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        groupedByDate: 'groupByDate',
        groupCount: 1,
      });
  });
  it('should render "allDayAppointmentLayer" template when currentView is not "month"', () => {
    const deps = {
      ...defaultDeps,
      template: {
        allDayAppointmentLayer: {},
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

    const allDayAppointmentLayer = tree.findWhere(
      node => node.prop('name') === 'allDayAppointmentLayer',
    ).at(0);

    expect(allDayAppointmentLayer.exists())
      .toBeTruthy();
    expect(isAllDayElementsMetaActual)
      .toHaveBeenCalledWith(
        defaultDeps.getter.viewCellsData,
        defaultDeps.getter.allDayElementsMeta,
        HORIZONTAL_GROUP_ORIENTATION,
        1,
      );
    expect(calculateRectByDateAndGroupIntervals)
      .toHaveBeenCalledWith({
        growDirection: 'horizontal', multiline: false,
      },
        defaultDeps.getter.allDayAppointments,
        getHorizontalRectByAppointmentData,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
      },
      {
        groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
        groupedByDate: 'groupByDate',
        groupCount: 1,
      });
  });
  it('should render "timeTableAppointmentLayer" when appointments are grouped vertically', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: {
            ...defaultDeps.getter,
            groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
            groups: [[{ id: 1 }, { id: 2 }]],
          },
        })}
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
    expect(isTimeTableElementsMetaActual)
      .toHaveBeenCalledWith(
        defaultDeps.getter.viewCellsData,
        defaultDeps.getter.timeTableElementsMeta,
      );
    expect(calculateRectByDateAndGroupIntervals)
      .toHaveBeenCalledWith({
        growDirection: 'vertical', multiline: false,
      },
        defaultDeps.getter.timeTableAppointments,
        getVerticalRectByAppointmentData,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        cellDuration: defaultDeps.getter.cellDuration,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
        placeAppointmentsNextToEachOther: false,
      },
      {
        groupOrientation: VERTICAL_GROUP_ORIENTATION,
        groupedByDate: 'groupByDate',
        groupCount: 2,
      });
  });
  // tslint:disable-next-line: max-line-length
  it('should render "allDayAppointmentLayer" template when currentView is not "month" with vertical grouping', () => {
    const deps = {
      ...defaultDeps,
      template: {
        allDayAppointmentLayer: {},
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...deps,
          getter: {
            ...deps.getter,
            groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
            groups: [[{ id: 1 }, { id: 2 }]],
          },
        })}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    ));

    const allDayAppointmentLayer = tree.findWhere(
      node => node.prop('name') === 'allDayAppointmentLayer',
    ).at(0);

    expect(allDayAppointmentLayer.exists())
      .toBeTruthy();
    expect(isAllDayElementsMetaActual)
      .toHaveBeenCalledWith(
        defaultDeps.getter.viewCellsData,
        defaultDeps.getter.allDayElementsMeta,
        VERTICAL_GROUP_ORIENTATION,
        2,
      );
    expect(calculateRectByDateAndGroupIntervals)
      .toHaveBeenCalledWith({
        growDirection: 'horizontal', multiline: false,
      },
        defaultDeps.getter.allDayAppointments,
        getHorizontalRectByAppointmentData,
      {
        startViewDate: defaultDeps.getter.startViewDate,
        endViewDate: defaultDeps.getter.endViewDate,
        viewCellsData: defaultDeps.getter.viewCellsData,
        cellElementsMeta: defaultDeps.getter.timeTableElementsMeta,
      },
      {
        groupOrientation: VERTICAL_GROUP_ORIENTATION,
        groupedByDate: 'groupByDate',
        groupCount: 2,
      });
  });
});
