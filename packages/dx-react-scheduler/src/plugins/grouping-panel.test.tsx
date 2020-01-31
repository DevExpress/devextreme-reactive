import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION, VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { GroupingPanel } from './grouping-panel';

describe('GroupingPanel', () => {
  const defaultProps = {
    horizontalLayoutComponent: () => null,
    verticalLayoutComponent: () => null,
    rowComponent: () => null,
    cellComponent: () => null,
    allDayCellComponent: () => null,
  };
  const defaultDeps = {
    template: {
      groupingPanel: {},
    },
    plugins: ['GroupingState', 'IntegratedGrouping'],
    getter: {
      groups: [[{}, {}]],
      viewCellsData: [[{}, {}], [{}, {}], [{}, {}]],
      currentView: { type: VIEW_TYPES.MONTH },
      groupByDate: () => true,
      groupOrientation: () => HORIZONTAL_GROUP_ORIENTATION,
      scrollingStrategy: {},
    },
  };

  it('should render horizontal groupingPanel', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'groupingPanel');

    expect(templatePlaceholder.exists())
      .toBeTruthy();

    const horizontalLayoutComponent = tree.find(defaultProps.horizontalLayoutComponent);
    expect(horizontalLayoutComponent.exists())
      .toBeTruthy();
    expect(horizontalLayoutComponent.props())
      .toMatchObject({
        rowComponent: defaultProps.rowComponent,
        cellComponent: defaultProps.cellComponent,
        colSpan: defaultDeps.getter.viewCellsData[0].length,
        groups: defaultDeps.getter.groups,
        showHeaderForEveryDate: true,
      });
  });

  it('should render vertical grouping panel', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: {
            ...defaultDeps.getter,
            groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
          },
        })}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'groupingPanel');

    expect(templatePlaceholder.exists())
      .toBeTruthy();

    const verticalLayoutComponent = tree.find(defaultProps.verticalLayoutComponent);
    expect(verticalLayoutComponent.exists())
      .toBeTruthy();
    expect(verticalLayoutComponent.props())
      .toMatchObject({
        rowComponent: defaultProps.rowComponent,
        cellComponent: defaultProps.cellComponent,
        groups: defaultDeps.getter.groups,
        rowSpan: defaultDeps.getter.viewCellsData.length,
        viewType: VIEW_TYPES.MONTH,
        cellTextTopOffset: undefined,
      });
  });

  it('should render all-day grouping panel', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: {
            ...defaultDeps.getter,
            groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
          },
          template: {
            allDayGroupingPanel: {},
          },
        })}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'allDayGroupingPanel');

    expect(templatePlaceholder.exists())
      .toBeTruthy();

    const verticalLayoutComponent = tree.find(defaultProps.verticalLayoutComponent);
    expect(verticalLayoutComponent.exists())
      .toBeTruthy();
    expect(verticalLayoutComponent.props())
      .toMatchObject({
        rowComponent: defaultProps.rowComponent,
        cellComponent: defaultProps.allDayCellComponent,
        rowSpan: 2,
        groups: defaultDeps.getter.groups,
        viewType: VIEW_TYPES.ALL_DAY_PANEL,
      });
  });
});
