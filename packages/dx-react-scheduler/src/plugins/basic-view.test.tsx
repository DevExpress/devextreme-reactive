import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  startViewDate,
  endViewDate,
  availableViews,
  getAppointmentStyle,
} from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';

/* tslint:disable max-line-length */
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  getAppointmentStyle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    availableViewNames: [],
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    currentView: {
      name: 'Day',
    },
    formatDate: jest.fn(),
  },
  template: {
    body: {},
    dayScale: {},
    timeScale: {},
    dayScaleEmptyCell: {},
    timeTable: {},
    appointment: {},
  },
};

const defaultProps = {
  viewCellsDataComputed: jest.fn(),
  name: 'Day',
  type: 'basic',
  cellDuration: 32,
  layoutComponent: () => null,
  dayScaleLayoutComponent: () => null,
  dayScaleCellComponent: () => null,
  dayScaleRowComponent: () => null,
  timeTableLayoutComponent: () => null,
  timeTableRowComponent: () => null,
  timeTableCellComponent: () => null,
  appointmentLayerComponent: () => null,
  calculateAppointmentsIntervals: jest.fn(),
};

describe('Basic View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    defaultProps.calculateAppointmentsIntervals.mockImplementation(() => () =>
      'calculateAppointmentsIntervals');
    defaultProps.viewCellsDataComputed.mockImplementation(
      () => () => [[{}, {}], [{}, {}]],
    );
    viewCellsData.mockImplementation(() => [
      [{}, {}],
      [{}, {}],
    ]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
    getAppointmentStyle.mockImplementation(() => undefined);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "viewCellsData" getter', () => {
      const props = {
        startDayHour: 1,
        endDayHour: 9,
        cellDuration: 30,
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            {...props}
          />
        </PluginHost>
      ));

      expect(defaultProps.viewCellsDataComputed)
        .toBeCalledWith(
          props.cellDuration,
          props.startDayHour,
          props.endDayHour,
        );
      expect(getComputedState(tree).viewCellsData)
        .toEqual([[{}, {}], [{}, {}]]);
    });
    it('should provide the "startViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            startDayHour={2}
          />
        </PluginHost>
      ));
      expect(startViewDate)
        .toBeCalledWith([[{}, {}], [{}, {}]]);
      expect(getComputedState(tree).startViewDate)
        .toBe('2018-07-04');
    });
    it('should provide the "endViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(endViewDate)
        .toBeCalledWith([[{}, {}], [{}, {}]]);
      expect(getComputedState(tree).endViewDate)
        .toBe('2018-07-11');
    });
    it('should provide the "intervalCount" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            intervalCount={2}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).intervalCount)
        .toBe(2);
    });
    it('should provide the "currentView" getter with default "displayName"', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Day', type: 'basic', displayName: 'Day' });
    });
    it('should provide the "currentView" getter with user-set "displayName"', () => {
      const userDisplayName = 'User-set display name';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            displayName={userDisplayName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Day', type: 'basic', displayName: userDisplayName });
    });
    it('should provide "availableViews" getter', () => {
      availableViews.mockImplementation(() => 'availableViews');
      const viewName = 'Custom Month';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            name={viewName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).availableViews)
        .toEqual('availableViews');
    });
    it('should provide "timeTableElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual({});

      const setCellElementsMeta = tree.find(defaultProps.timeTableLayoutComponent)
        .props().setCellElementsMeta;
      setCellElementsMeta('elementsMeta');

      tree.update();

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual('elementsMeta');
    });
    it('should provide "scrollingStrategy" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).scrollingStrategy)
        .toEqual({
          topBoundary: 0,
          bottomBoundary: 0,
          leftBoundary: 0,
          rightBoundary: 0,
          changeVerticalScroll: expect.any(Function),
          changeHorizontalScroll: expect.any(Function),
        });
    });
    it('should provide "timeTableAppointments" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableAppointments)
        .toEqual('calculateAppointmentsIntervals');
      expect(defaultProps.calculateAppointmentsIntervals)
        .toHaveBeenCalledWith(defaultProps.cellDuration);
    });
    it('should not override previous view type', () => {
      const prevView = { name: 'Month', type: 'month' };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: prevView } })}
          <BasicView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual(prevView);
    });
  });

  describe('Templates', () => {
    it('should render view layout', () => {
      const customLayout = () => null;
      const layoutProps = { data1: 1, data2: 2 };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            layoutProps={layoutProps}
            layoutComponent={customLayout}
          />
        </PluginHost>
      ));

      expect(tree.find(customLayout).props())
        .toMatchObject({
          dayScaleComponent: expect.any(Function),
          timeTableComponent: expect.any(Function),
          setScrollingStrategy: expect.any(Function),
          data1: 1,
          data2: 2,
        });
    });
    it('should render day scale', () => {
      const customDayScaleLayout = () => null;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps.getter,
              groupByDate: () => true,
            },
          })}
          <BasicView
            {...defaultProps}
            dayScaleLayoutComponent={customDayScaleLayout}
          />
        </PluginHost>
      ));

      expect(tree.find(customDayScaleLayout).props())
        .toMatchObject({
          formatDate: defaultDeps.getter.formatDate,
          cellComponent: defaultProps.dayScaleCellComponent,
          rowComponent: defaultProps.dayScaleRowComponent,
          cellsData: [[{}, {}], [{}, {}]],
          groupedByDate: true,
        });
    });
    it('should render timetable', () => {
      const customTimeTableLayout = () => null;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            timeTableLayoutComponent={customTimeTableLayout}
          />
        </PluginHost>
      ));

      expect(tree.find(customTimeTableLayout).props())
        .toMatchObject({
          formatDate: defaultDeps.getter.formatDate,
          cellsData: [[{}, {}], [{}, {}]],
          rowComponent: defaultProps.timeTableRowComponent,
          setCellElementsMeta: expect.any(Function),
          cellComponent: expect.any(Function),
        });
    });
    it('should render appointment layer', () => {
      const customAppointmentLayer = ({ children }) => <div>{children}</div>;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            appointmentLayerComponent={customAppointmentLayer}
          />
        </PluginHost>
      ));

      expect(tree.find(customAppointmentLayer).exists())
        .toBeTruthy();
    });
    it('should render day scale empty cell', () => {
      const customEmptyCell = () => null;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            dayScaleEmptyCellComponent={customEmptyCell}
          />
        </PluginHost>
      ));

      expect(tree.find(customEmptyCell).exists())
        .toBeTruthy();
    });
    it('should rerender the timeTableLayout every time the timeTable cell is changed', () => {
      let updateCount = 0;
      const firstTimeTableCell = jest.fn();
      const timeTableLayout = React.memo(() => {
        React.useEffect(() => {
          updateCount += 1;
        });
        return null;
      });

      const Test = ({ timeTableCellComponent }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <BasicView
            {...defaultProps}
            timeTableCellComponent={timeTableCellComponent}
            timeTableLayoutComponent={timeTableLayout}
          />
        </PluginHost>
      );

      const tree = mount(<Test timeTableCellComponent={firstTimeTableCell} />);
      expect(updateCount)
        .toEqual(1);

      const secondTimeTableCell = jest.fn();
      tree.setProps({
        timeTableCellComponent: secondTimeTableCell,
      });

      expect(updateCount)
        .toEqual(2);
    });
  });
});
