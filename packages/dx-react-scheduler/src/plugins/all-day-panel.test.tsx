import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  allDayCells, getAppointmentStyle, calculateAllDayDateIntervals,
  VIEW_TYPES, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { AllDayPanel } from './all-day-panel';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  allDayCells: jest.fn(),
  getAppointmentStyle: jest.fn(),
  calculateAllDayDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    currentView: { type: VIEW_TYPES.WEEK },
    startViewDate: '2018-07-04',
    endViewDate: '2018-07-06',
    excludedDays: [],
    formatDate: jest.fn(),
    appointments: [],
    viewCellsData: 'viewCellsData',
  },
  template: {
    body: {},
    dayScale: {},
    sidebar: {},
    main: {},
    dayScaleEmptyCell: {},
    timeTable: {},
    timeScale: {},
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
    allDayCells.mockImplementation(() => 'allDayCells');
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

    it('should provide "allDayCellsData" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).allDayCellsData)
        .toBe('allDayCells');
      expect(allDayCells)
        .toHaveBeenCalledWith('viewCellsData');
    });

    it('should provide "allDayPanelExists" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).allDayPanelExists)
        .toBeTruthy();
    });

    // tslint:disable-next-line: max-line-length
    it('should provide "allDayPanelExists" getter, which return false if current view is month', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps,
              currentView: { type: VIEW_TYPES.MONTH },
            },
          })}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).allDayPanelExists)
        .toBeFalsy();
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

    it('should render appointment layer when vertical grouping is used', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps.getter,
              groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
            },
          })}
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

    it('should render timeTable template', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const timeTableTemplatePlaceholder = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeTable').first()
        .children().find('TemplatePlaceholderBase');

      expect(timeTableTemplatePlaceholder.exists())
        .toBeTruthy();
      expect(timeTableTemplatePlaceholder.props().params)
        .toEqual({});
    });

    it('should render timeTable template with correct params', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps.getter,
              groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
            },
          })}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const timeTableTemplatePlaceholder = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeTable').first()
        .children().find('TemplatePlaceholderBase');

      expect(timeTableTemplatePlaceholder.exists())
        .toBeTruthy();
      expect(timeTableTemplatePlaceholder.props().params)
        .toEqual({
          allDayCellComponent: expect.any(Function),
          allDayRowComponent: defaultProps.rowComponent,
          allDayCellsData: 'allDayCells',
        });
    });

    it('should render timeScale template', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const timeTableTemplatePlaceholder = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeScale').first()
        .children().find('TemplatePlaceholderBase');

      expect(timeTableTemplatePlaceholder.exists())
        .toBeTruthy();
      expect(timeTableTemplatePlaceholder.props().params)
        .toEqual({});
    });

    it('should render timeScale template with correct params', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps.getter,
              groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
            },
          })}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      const timeTableTemplatePlaceholder = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeScale').first()
        .children().find('TemplatePlaceholderBase');

      expect(timeTableTemplatePlaceholder.exists())
        .toBeTruthy();
      expect(timeTableTemplatePlaceholder.props().params)
        .toEqual({
          allDayTitleComponent: expect.any(Function),
          showAllDayTitle: true,
        });
    });

    it('should render all day title template', () => {
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
