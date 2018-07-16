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
const TableComponent = () => null;
const NavigatorComponent = () => null;
const ToggleButtonComponent = () => null;
const TitleComponent = () => null;
const NavigationButton = () => null;
const Root = () => null;

const defaultProps = {
  rootComponent: Root,
  overlayComponent: OverlayComponent,
  tableComponent: TableComponent,
  toggleButtonComponent: ToggleButtonComponent,
  navigatorComponent: NavigatorComponent,
  titleComponent: TitleComponent,
  navigationButtonComponent: NavigationButton,
  cellComponent: () => null,
  rowComponent: () => null,
  headerRowComponent: () => null,
  headerCellComponent: () => null,
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

  it('should render table', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(TableComponent).exists())
      .toBeTruthy();
  });

  it('should render navigator', () => {
    const navigator = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    )).find(NavigatorComponent);
    const {
      currentDate,
      titleComponent,
      navigationButtonComponent,
      onNavigate,
    } = navigator.props();

    onNavigate({ back: true });

    expect(navigator.exists())
      .toBeTruthy();
    expect(defaultDeps.action.setCurrentDate.mock.calls[0][0])
      .toEqual({ back: true, step: 7 });
    expect(currentDate)
      .toBe('2018-07-05');
    expect(titleComponent)
      .toBe(TitleComponent);
    expect(navigationButtonComponent)
      .toBe(NavigationButton);
  });

  it('should calculate table cells via the "monthCells" computed', () => {
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
