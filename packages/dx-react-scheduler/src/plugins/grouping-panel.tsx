import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { GroupingPanelProps } from '../types';
const GroupingPanelPlaceholder = () => <TemplatePlaceholder name="groupingPanel" />;

const pluginDependencies = [
  { name: 'GroupingState' },
  { name: 'IntegratedGrouping' },
];

class GroupingPanelBase extends React.PureComponent<GroupingPanelProps> {
  static components: PluginComponents = {
    horizontalLayoutComponent: 'HorizontalLayout',
    rowComponent: 'Row',
    cellComponent: 'Cell',
    containerComponent: 'Container',
  };

  render() {
    const {
      containerComponent: Container,
      horizontalLayoutComponent: HorizontalLayout,
      rowComponent,
      cellComponent,
    } = this.props;

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="dayScale">
          <TemplateConnector>
            {() => {
              return (
                <Container>
                  <GroupingPanelPlaceholder />
                </Container>
              );
            }}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>

        <Template name="groupingPanel">
          <TemplateConnector>
            {({ groupingItems, viewCellsData }) => {
              return (
                <HorizontalLayout
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                  groups={groupingItems}
                  width={viewCellsData[0].length}
                />
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's grouping panel. */
export const GroupingPanel: React.ComponentType<GroupingPanelProps> = GroupingPanelBase;
