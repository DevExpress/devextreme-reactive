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
} from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';

/* tslint:disable max-line-length */
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
}));

const defaultDeps = {
  getter: {
    availableViewNames: [],
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
  },
};

const defaultProps = {
  viewCellsDataBaseComputed: jest.fn(),
  name: 'Day',
  type: 'basic',
};

describe('Basic View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    defaultProps.viewCellsDataBaseComputed.mockImplementation(
      () => () => [[{}, {}], [{}, {}]],
    );
    viewCellsData.mockImplementation(() => [
      [{}, {}],
      [{}, {}],
    ]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
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

      expect(defaultProps.viewCellsDataBaseComputed)
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
});
