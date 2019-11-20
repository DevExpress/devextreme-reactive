import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
  Getter,
} from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import { getGroupingItemsFromResources, getGroupedViewCellsData, sortFilteredResources, filterResourcesByGrouping } from '@devexpress/dx-scheduler-core';

const GroupingPanelPlaceholder = () => <TemplatePlaceholder name="groupingPanel" />;

const pluginDependencies = [
  { name: 'Resources' },
];

const getViewCellsDataComputed = memoize(({ viewCellsData, groupingItems, sortedResources }) => {
  console.log(viewCellsData)
  console.log(groupingItems)
  const result = getGroupedViewCellsData(viewCellsData, groupingItems, sortedResources);
  console.log(result)
  return result;
});

const getGroupingItemsComputed = memoize((
  { grouping, resources },
) => getGroupingItemsFromResources(resources, grouping));

const getSortedResourcesComputed = memoize((
  { resources, grouping },
) => sortFilteredResources(filterResourcesByGrouping(resources, grouping), grouping));

class GroupingPanelBase extends React.PureComponent {
  static components: PluginComponents = {
    layoutComponent: 'Layout',
    rowComponent: 'Row',
    cellComponent: 'Cell',
    iconComponent: 'Icon',
    containerComponent: 'Container',
  };

  static defaultProps = {
    grouping: [],
  };

  render() {
    const {
      containerComponent: Container,
      layoutComponent: Layout,
      rowComponent,
      cellComponent,
      iconComponent,
    } = this.props;

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={pluginDependencies}
      >
        <Getter name="sortedResources" computed={getSortedResourcesComputed} />
        <Getter name="groupingItems" computed={getGroupingItemsComputed} />
        <Getter name="viewCellsData" computed={getViewCellsDataComputed} />

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
            {({ groupingItems }) => {
              return (
                <Layout
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                  groups={groupingItems}
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
export const GroupingPanel: React.ComponentType = GroupingPanelBase;
