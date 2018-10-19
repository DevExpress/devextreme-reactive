import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { monthCellsData, viewBoundText } from '@devexpress/dx-scheduler-core';
import { DateNavigator } from './date-navigator';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  monthCellsData: jest.fn(),
  viewBoundText: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-05',
    firstDayOfWeek: 1,
    currentView: { type: 'month' },
    intervalCount: 3,
  },
  action: {
    changeCurrentDate: jest.fn(),
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['Toolbar', 'ViewState'],
};

// eslint-disable-next-line react/prop-types
const OverlayComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
const Root = () => null;
const OpenButtonComponent = () => null;
const NavigationButton = () => null;

const CalendarComponent = () => null;
const CalendarTextComponent = () => null;
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
  openButtonComponent: OpenButtonComponent,

  calendarComponent: CalendarComponent,
  calendarNavigatorComponent: CalendarNavigatorComponent,
  calendarTextComponent: CalendarTextComponent,
  calendarNavigationButtonComponent: CalendarNavigationButtonComponent,
  calendarCellComponent: CalendarCell,
  calendarRowComponent: CalendarRow,
  calendarHeaderRowComponent: CalendarHeaderRow,
  calendarHeaderCellComponent: CalendarHeaderCell,
};

describe('DateNavigator', () => {
  beforeEach(() => {
    monthCellsData.mockImplementation(() => [[{ startDate: '2018-04-07' }]]);
    viewBoundText.mockImplementation(() => 'July 2018');
  });
  afterEach(() => {
    jest.resetAllMocks();
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
      openButtonComponent,
      navigatorText,
      onNavigate,
    } = root.props();

    onNavigate();

    expect(root.exists())
      .toBeTruthy();
    expect(navigationButtonComponent)
      .toBe(NavigationButton);
    expect(openButtonComponent)
      .toBe(OpenButtonComponent);
    expect(navigatorText)
      .toBe('July 2018');
    expect(defaultDeps.action.changeCurrentDate)
      .toBeCalledWith({ amount: 3, step: 'month' }, expect.any(Object), expect.any(Object));
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
      firstDayOfWeek,
      textComponent,
      navigationButtonComponent,
      rowComponent,
      cellComponent,
      headerRowComponent,
      headerCellComponent,
      navigatorComponent,
      onNavigate,
    } = calendar.props();

    onNavigate();

    expect(calendar.exists()).toBeTruthy();
    expect(currentDate).toBe('2018-07-05');
    expect(firstDayOfWeek).toBe(1);
    expect(textComponent).toBe(CalendarTextComponent);
    expect(navigationButtonComponent).toBe(CalendarNavigationButtonComponent);
    expect(rowComponent).toBe(CalendarRow);
    expect(cellComponent).toBe(CalendarCell);
    expect(headerRowComponent).toBe(CalendarHeaderRow);
    expect(headerCellComponent).toBe(CalendarHeaderCell);
    expect(navigatorComponent).toBe(CalendarNavigatorComponent);
    expect(defaultDeps.action.changeCurrentDate).toHaveBeenCalled();
  });

  it('should calculate calendar cells via the "monthCells" computed', () => {
    const { getCells } = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    )).find(CalendarComponent).props();

    expect(getCells())
      .toEqual([[{ startDate: '2018-04-07' }]]);
  });
});
