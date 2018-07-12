import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { monthCells, dayScale } from '@devexpress/dx-scheduler-core';
import { DateNavigator } from './date-navigator';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  monthCells: jest.fn(),
  dayScale: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-05',
    firstDayOfWeek: 1,
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['Toolbar'],
};

// eslint-disable-next-line react/prop-types
const OverlayComponent = ({ children }) => <div>{children}</div>;
const TableComponent = () => null;
const NavigatorComponent = () => null;
const ToggleButtonComponent = () => null;
const TitleComponent = () => null;

const defaultProps = {
  overlayComponent: OverlayComponent,
  tableComponent: TableComponent,
  toggleButtonComponent: ToggleButtonComponent,
  navigatorComponent: NavigatorComponent,
  titleComponent: TitleComponent,
  cellComponent: () => null,
  rowComponent: () => null,
  headerRowComponent: () => null,
  headerCellComponent: () => null,
};

describe('DateNavigator', () => {
  beforeEach(() => {
    monthCells.mockImplementation(() => [[{ value: '2018-04-07' }]]);
    dayScale.mockImplementation(() => ['Mon', 'Tue', 'Wed']);
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

  it('should render toggle button', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(ToggleButtonComponent).exists())
      .toBeTruthy();
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
    const { currentDate, titleComponent } = navigator.props();

    expect(navigator.exists())
      .toBeTruthy();
    expect(currentDate)
      .toBe('2018-07-05');
    expect(titleComponent)
      .toBe(TitleComponent);
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
