import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { monthCells, dayScale, viewBoundTitle } from '@devexpress/dx-scheduler-core';
import { DateNavigator } from './date-navigator';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  monthCells: jest.fn(),
  dayScale: jest.fn(),
  viewBoundTitle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-05',
    firstDayOfWeek: 1,
  },
  action: {
    setCurrentDate: jest.fn(),
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['Toolbar', 'ViewState'],
};

// eslint-disable-next-line react/prop-types
const OverlayComponent = ({ children }) => <div>{children}</div>;
const Root = () => null;
const ToggleButtonComponent = () => null;
const NavigationButton = () => null;

const CalendarComponent = () => null;
const CalendarTitleComponent = () => null;
const CalendarNavigationButtonComponent = () => null;
const CalendarNavigatorComponent = () => null;
const CalendarCell = () => null;
const CalendarRow = () => null;
const CalendarHeaderRow = () => null;
const CalendarHeaderCell = () => null;


const defaultProps = {
  rootComponent: Root,
  overlayComponent: OverlayComponent,
  navigationButtonComponent: NavigationButton,
  toggleButtonComponent: ToggleButtonComponent,

  calendarComponent: CalendarComponent,
  calendarNavigatorComponent: CalendarNavigatorComponent,
  calendarTitleComponent: CalendarTitleComponent,
  calendarNavigationButtonComponent: CalendarNavigationButtonComponent,
  calendarCellComponent: CalendarCell,
  calendarRowComponent: CalendarRow,
  calendarHeaderRowComponent: CalendarHeaderRow,
  calendarHeaderCellComponent: CalendarHeaderCell,
};

describe('DateNavigator', () => {
  beforeEach(() => {
    monthCells.mockImplementation(() => [[{ value: '2018-04-07' }]]);
    dayScale.mockImplementation(() => ['Mon', 'Tue', 'Wed']);
    viewBoundTitle.mockImplementation(() => 'July 2018');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "monthCells" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).monthCells)
      .toEqual([[{ value: '2018-04-07' }]]);
  });

  it('should provide the "weekDays" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).weekDays)
      .toEqual(['Mon', 'Tue', 'Wed']);
  });

  it('should render overlay', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(OverlayComponent).exists())
      .toBeTruthy();
  });

  it('should render root component', () => {
    const root = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    )).find(Root);
    const {
      navigationButtonComponent,
      toggleButtonComponent,
      navigatorTitle,
      onNavigate,
    } = root.props();

    onNavigate();

    expect(root.exists())
      .toBeTruthy();
    expect(navigationButtonComponent)
      .toBe(NavigationButton);
    expect(toggleButtonComponent)
      .toBe(ToggleButtonComponent);
    expect(navigatorTitle)
      .toBe('July 2018');
    expect(defaultDeps.action.setCurrentDate)
      .toBeCalled();
  });

  it('should render calendar', () => {
    const calendar = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    )).find(CalendarComponent);
    const {
      currentDate,
      titleComponent,
      navigationButtonComponent,
      rowComponent,
      cellComponent,
      headerRowComponent,
      headerCellComponent,
      navigatorComponent,
      onCellClick,
      onNavigate,
    } = calendar.props();

    onCellClick();
    onNavigate();

    expect(calendar.exists()).toBeTruthy();
    expect(currentDate).toBe('2018-07-05');
    expect(titleComponent).toBe(CalendarTitleComponent);
    expect(navigationButtonComponent).toBe(CalendarNavigationButtonComponent);
    expect(rowComponent).toBe(CalendarRow);
    expect(cellComponent).toBe(CalendarCell);
    expect(headerRowComponent).toBe(CalendarHeaderRow);
    expect(headerCellComponent).toBe(CalendarHeaderCell);
    expect(navigatorComponent).toBe(CalendarNavigatorComponent);
    expect(defaultDeps.action.setCurrentDate).toHaveBeenCalledTimes(2);
  });

  it('should calculate calendar cells via the "monthCells" computed', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(monthCells)
      .toHaveBeenCalledTimes(1);
    expect(monthCells)
      .toHaveBeenCalledWith(defaultDeps.getter.currentDate, defaultDeps.getter.firstDayOfWeek);
  });
});
