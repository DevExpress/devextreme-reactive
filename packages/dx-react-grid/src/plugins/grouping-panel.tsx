import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector, withComponents,
  Getters, Actions,
} from '@devexpress/dx-react-core';
import {
  groupingPanelItems,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';
import { GroupPanelLayout as Layout } from '../components/group-panel-layout';
import { GroupingPanelProps } from '../types';

const defaultMessages = {
  groupByColumn: 'Drag a column header here to group by that column',
};

const defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
  messages: {},
};

class GroupingPanelRaw extends React.PureComponent<GroupingPanelProps & typeof defaultProps> {
  static defaultProps = defaultProps;
  static components = {
    layoutComponent: 'Layout',
    containerComponent: 'Container',
    itemComponent: 'Item',
    emptyMessageComponent: 'EmptyMessage',
  };

  render() {
    const {
      layoutComponent: LayoutComponent,
      containerComponent: Container,
      itemComponent: Item,
      emptyMessageComponent: EmptyMessage,
      showSortingControls,
      showGroupingControls,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    const EmptyMessagePlaceholder = () => (
      <EmptyMessage
        getMessage={getMessage}
      />
    );

    const ItemPlaceholder = ({ item }) => {
      const { name: columnName } = item.column;

      return (
        <TemplateConnector>
          {(
            { sorting, isColumnSortingEnabled, isColumnGroupingEnabled },
            { changeColumnGrouping, changeColumnSorting },
          ) => {
            const sortingEnabled = isColumnSortingEnabled && isColumnSortingEnabled(columnName);
            const groupingEnabled = isColumnGroupingEnabled && isColumnGroupingEnabled(columnName);

            return (
              <Item
                item={item}
                sortingEnabled={sortingEnabled}
                groupingEnabled={groupingEnabled}
                showSortingControls={showSortingControls}
                sortingDirection={showSortingControls
                  ? getColumnSortingDirection(sorting, columnName)! : undefined}
                showGroupingControls={showGroupingControls}
                onGroup={() => changeColumnGrouping({ columnName })}
                onSort={(
                  { direction, keepOther },
                ) => changeColumnSorting({ columnName, direction, keepOther })}
              />
            );
          }}
        </TemplateConnector>
      );
    };

    return (
      <Plugin
        name="GroupingPanel"
        dependencies={[
          { name: 'GroupingState' },
          { name: 'Toolbar' },
          { name: 'SortingState', optional: !showSortingControls },
        ]}
      >
        <Template name="toolbarContent">
          <TemplateConnector>
            {({
              columns, grouping, draftGrouping, draggingEnabled, isColumnGroupingEnabled,
            }: Getters, {
              changeColumnGrouping, draftColumnGrouping, cancelColumnGroupingDraft,
            }: Actions) => (
              <LayoutComponent
                items={groupingPanelItems(columns, grouping, draftGrouping)}
                isColumnGroupingEnabled={isColumnGroupingEnabled}
                draggingEnabled={draggingEnabled}
                onGroup={changeColumnGrouping}
                onGroupDraft={draftColumnGrouping}
                onGroupDraftCancel={cancelColumnGroupingDraft}
                itemComponent={ItemPlaceholder}
                emptyMessageComponent={EmptyMessagePlaceholder}
                containerComponent={Container}
              />
            )}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}

/***
 * A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped
 * columns and allows a user to modify grouping options.Optionally, the plugin allows an end-user
 * to change grouped columns' sorting order and render sorting indicators.
 * */
export const GroupingPanel: React.ComponentType<GroupingPanelProps> = withComponents(
  { Layout },
)(GroupingPanelRaw);
