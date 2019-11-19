import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { getGroupingItemsFromResources } from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Resources' },
];

class GroupingPanelBase extends React.PureComponent {
  static components: PluginComponents = {
    layoutComponent: 'Layout',
    rowComponent: 'Row',
    cellComponent: 'Cell',
    iconComponent: 'Icon',
  };

  static defaultProps = {
    grouping: [],
  };

  render() {
    const {
      containerComponent,
      layoutComponent,
      rowComponent,
      cellComponent,
      iconComponent,
    } = this.props;

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="dayScale">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ resources, grouping }) => {
              const groupingItems = getGroupingItemsFromResources(resources, grouping);
              console.log(groupingItems)
              return null;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's grouping panel. */
export const GroupingPanel: React.ComponentType = GroupingPanelBase;
