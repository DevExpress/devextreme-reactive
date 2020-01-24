import * as React from 'react';
import {
  Plugin,
  Template,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { GroupingPanelProps } from '../types';
import {
  VERTICAL_VIEW_LEFT_OFFSET, HORIZONTAL_VIEW_LEFT_OFFSET, HORIZONTAL_GROUP_ORIENTATION,
  VERTICAL_GROUP_ORIENTATION, extractLastRowFromGroups, Group,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'GroupingState' },
  { name: 'IntegratedGrouping' },
  { name: 'DayView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'ViewState', optional: true },
];

class GroupingPanelBase extends React.PureComponent<GroupingPanelProps> {
  static components: PluginComponents = {
    horizontalLayoutComponent: 'HorizontalLayout',
    verticalLayoutComponent: 'VerticalLayout',
    rowComponent: 'Row',
    cellComponent: 'Cell',
    allDayCellComponent: 'AllDayCell',
  };

  render() {
    const {
      horizontalLayoutComponent: HorizontalLayout,
      verticalLayoutComponent: VerticalLayout,
      rowComponent,
      cellComponent,
      allDayCellComponent,
    } = this.props;

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="groupingPanel">
          <TemplateConnector>
            {({ groups, viewCellsData, currentView, groupByDate, groupOrientation }) =>
              groupOrientation(currentView?.name) === HORIZONTAL_GROUP_ORIENTATION ? (
                <HorizontalLayout
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                  groups={groups}
                  colSpan={viewCellsData[0].length}
                  cellStyle={{
                    left: currentView && currentView.type === 'month'
                      ? HORIZONTAL_VIEW_LEFT_OFFSET
                      : VERTICAL_VIEW_LEFT_OFFSET,
                  }}
                  showHeaderForEveryDate={groupByDate?.(currentView && currentView.name)}
                />
              ) : (
                <VerticalLayout
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                  groups={groups}
                  rowSpan={viewCellsData.length}
                  timeTableCellHeight={currentView.type === 'month' ? 100 : 48}
                  width={groups.length * 100}
                />
              )}
          </TemplateConnector>
        </Template>
        <Template name="allDayGroupingPanel">
          <TemplateConnector>
            {({ groups, currentView, groupOrientation }) =>
              groupOrientation(currentView?.name) === VERTICAL_GROUP_ORIENTATION && (
                <>
                  <VerticalLayout
                    rowComponent={rowComponent}
                    cellComponent={allDayCellComponent}
                    groups={groups}
                    rowSpan={groups[groups.length - 1].length}
                    timeTableCellHeight={46}
                    width={groups.length * 100}
                  />
                  <VerticalLayout
                    rowComponent={rowComponent}
                    cellComponent={allDayCellComponent}
                    groups={extractLastRowFromGroups(groups) as Group[][]}
                    rowSpan={groups[groups.length - 1].length}
                    timeTableCellHeight={46}
                    width={80}
                  />
                </>
              )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the grouping panel used to display group names. */
export const GroupingPanel: React.ComponentType<GroupingPanelProps> = GroupingPanelBase;
