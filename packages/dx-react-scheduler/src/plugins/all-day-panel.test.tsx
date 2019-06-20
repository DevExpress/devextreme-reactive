import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  allDayCells,
  calculateRectByDateIntervals,
  calculateAllDayDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { AllDayPanel } from './all-day-panel';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  allDayCells: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  calculateAllDayDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    currentView: 'week',
    startViewDate: '',
    endViewDate: '',
    excludedDays: [],
    formatDate: jest.fn(),
  },
  template: {
    body: {},
    dayScale: {},
    sidebar: {},
    main: {},
    dayScaleEmptyCell: {},
  },
};

const defaultProps = {
  messages: {},
  cellComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  rowComponent: ({ children }) => <tr>{children}</tr>,
  titleCellComponent: () => null,
  appointmentLayerComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  layoutComponent: ({ children }) => <div>{children}</div>,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div>{children}</div>,
};

describe('AllDayPanel', () => {
  beforeEach(() => {
    calculateRectByDateIntervals.mockImplementation(() => [{
      dataItem: {}, type: 'h', top: 0, left: 0,
    }]);
    calculateAllDayDateIntervals.mockImplementation(() => []);
    allDayCells.mockImplementation(() => [[{}]]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide allDayElementsMeta getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).allDayElementsMeta)
        .toEqual({});
    });
  });

  describe('Templates', () => {
    it('should render AllDayPanel layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const layout = defaultProps.layoutComponent;

      expect(tree.find(layout).exists())
        .toBeTruthy();
      expect(tree.find(layout).props().formatDate)
        .toEqual(defaultDeps.getter.formatDate);
      expect(tree.find(layout).props().setCellElementsMeta)
        .toEqual(expect.any(Function));
    });

    it('should render appointment layer', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.appointmentLayerComponent).exists())
        .toBeTruthy();
    });

    it('should render title cell component', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.titleCellComponent).exists())
        .toBeTruthy();
    });

    it('should render all day cell template', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
          <TemplatePlaceholder name="allDayPanelCell" />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.cellComponent).exists())
        .toBeTruthy();
    });
  });
});
