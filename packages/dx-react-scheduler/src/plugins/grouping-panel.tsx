import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
const GroupingPanelPlaceholder = () => <TemplatePlaceholder name="groupingPanel" />;

const pluginDependencies = [
  { name: 'Resources' },
  { name: 'GroupingState' },
  { name: 'IntegratedGrouping' },
];

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
