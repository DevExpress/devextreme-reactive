import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost, TemplatePlaceholder, Template } from '@devexpress/dx-react-core';
import {
  allDayCells,
  getAppointmentStyle,
  calculateAllDayDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { AllDayPanel } from './all-day-panel';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  allDayCells: jest.fn(),
  getAppointmentStyle: jest.fn(),
  calculateAllDayDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    currentView: 'week',
    startViewDate: '2018-07-04',
    endViewDate: '2018-07-06',
    excludedDays: [],
    formatDate: jest.fn(),
    appointments: [],
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
    allDayCells.mockImplementation(() => [[{}]]);
    getAppointmentStyle.mockImplementation(() => undefined);
    calculateAllDayDateIntervals.mockImplementation(() => 'allDayAppointments');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide "allDayElementsMeta" getter', () => {
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

      const setCellElementsMeta = tree.find(defaultProps.layoutComponent)
        .props().setCellElementsMeta;
      setCellElementsMeta('elementsMeta');
      tree.update();

      expect(getComputedState(tree).allDayElementsMeta)
        .toEqual('elementsMeta');
    });

    it('should provide "allDayAppointments" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).allDayAppointments)
        .toEqual('allDayAppointments');
      expect(calculateAllDayDateIntervals)
        .toHaveBeenCalledWith([], new Date(2018, 6, 4, 0, 0), new Date(2018, 6, 6, 23, 59), []);
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

    it('should render body template', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const templatePlaceholder = tree
        .findWhere(node => node.type() === Template && node.props().name === 'body');

      expect(templatePlaceholder.exists())
        .toBeTruthy();
    });

    it('should rerender the all-day layout every time the cell component is changed', () => {
      let updateCount = 0;
      const firstCell = jest.fn();
      const layout = React.memo(() => {
        React.useEffect(() => {
          updateCount += 1;
        });
        return null;
      });

      const Test = ({ cellComponent }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
            cellComponent={cellComponent}
            layoutComponent={layout}
          />
        </PluginHost>
      );

      const tree = mount(<Test cellComponent={firstCell} />);
      expect(updateCount)
        .toEqual(1);

      const secondCell = jest.fn();
      tree.setProps({
        cellComponent: secondCell,
      });

      expect(updateCount)
        .toEqual(2);
    });
  });
});
