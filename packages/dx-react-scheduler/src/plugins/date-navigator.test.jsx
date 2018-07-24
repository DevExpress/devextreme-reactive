import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { monthCellsCore } from '@devexpress/dx-scheduler-core';
import { DateNavigator } from './date-navigator';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  monthCellsCore: jest.fn(),
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
const TableComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
// eslint-disable-next-line react/prop-types
const OverlayComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
// eslint-disable-next-line react/prop-types
const RowComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
const ToggleButtonComponent = () => null;
const CellComponent = () => null;

const defaultProps = {
  overlayComponent: OverlayComponent,
  tableComponent: TableComponent,
  cellComponent: CellComponent,
  rowComponent: RowComponent,
  toggleButtonComponent: ToggleButtonComponent,
};

describe('DateNavigator', () => {
  beforeEach(() => {
    monthCellsCore.mockImplementation(() => [[{ value: '2018-04-07' }]]);
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

  it('should calculate table cells via the "monthCells" computed', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DateNavigator
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(monthCellsCore)
      .toHaveBeenCalledTimes(1);
    expect(monthCellsCore)
      .toHaveBeenCalledWith(defaultDeps.getter.currentDate, defaultDeps.getter.firstDayOfWeek);
  });
});
