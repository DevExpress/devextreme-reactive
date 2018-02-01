import React from 'react';
import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  groupingPanelItems,
  getColumnSortingDirection,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      layoutComponent: Layout,
      containerComponent: Container,
      itemComponent: Item,
      emptyMessageComponent: EmptyMessage,
      showSortingControls,
      showGroupingControls,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

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
                sortingDirection={sortingEnabled && showSortingControls
                  ? getColumnSortingDirection(sorting, columnName) : undefined}
                showGroupingControls={showGroupingControls}
                onGroup={() => changeColumnGrouping({ columnName })}
                onSort={({ direction, keepOther }) =>
                  changeColumnSorting({ columnName, direction, keepOther })}
              />
            );
          }}
        </TemplateConnector>
      );
    };

    return (
      <PluginContainer
        pluginName="GroupingPanel"
        dependencies={[
          { pluginName: 'GroupingState' },
          { pluginName: 'Toolbar' },
          { pluginName: 'SortingState', optional: !showSortingControls },
        ]}
      >
        <Template name="toolbarContent">
          <TemplateConnector>
            {({
              columns, grouping, draftGrouping, draggingEnabled, columnGroupingEnabled,
            }, {
              changeColumnGrouping, draftColumnGrouping, cancelColumnGroupingDraft,
            }) => (
              <Layout
                items={groupingPanelItems(columns, grouping, draftGrouping)}
                columnGroupingEnabled={columnGroupingEnabled}
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
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  layoutComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
  messages: {},
};
