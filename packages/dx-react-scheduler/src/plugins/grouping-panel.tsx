import * as React from 'react';
import {
  Plugin,
  Template,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { GroupingPanelProps } from '../types';
import { VERTICAL_VIEW_LEFT_OFFSET, HORIZONTAL_VIEW_LEFT_OFFSET } from '@devexpress/dx-scheduler-core';

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
    rowComponent: 'Row',
    cellComponent: 'Cell',
  };

  render() {
    const {
      horizontalLayoutComponent: HorizontalLayout,
      rowComponent,
      cellComponent,
    } = this.props;

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="groupingPanel">
          <TemplateConnector>
            {({ groupingItems, viewCellsData, currentView }) => (
              <HorizontalLayout
                rowComponent={rowComponent}
                cellComponent={cellComponent}
                groups={groupingItems}
                length={viewCellsData[0].length}
                cellStyle={{
                  left: currentView && currentView.type === 'month'
                  ? HORIZONTAL_VIEW_LEFT_OFFSET
                  : VERTICAL_VIEW_LEFT_OFFSET,
                }}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Grouping Panel and used to display groups. */
export const GroupingPanel: React.ComponentType<GroupingPanelProps> = GroupingPanelBase;
