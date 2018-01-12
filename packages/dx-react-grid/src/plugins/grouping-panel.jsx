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
          {({ sorting }, { groupByColumn, changeColumnSorting }) => (
            <Item
              item={item}
              showSortingControls={showSortingControls && sorting !== undefined}
              sortingDirection={sorting !== undefined
                ? getColumnSortingDirection(sorting, columnName) : undefined}
              showGroupingControls={showGroupingControls}
              onGroup={() => groupByColumn({ columnName })}
              onSort={({ direction, keepOther }) =>
                changeColumnSorting({ columnName, direction, keepOther })}
            />
          )}
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
              columns, draftGrouping, draggingEnabled,
            }, {
              groupByColumn, draftGroupingChange, cancelGroupingChange,
            }) => (
              <Layout
                items={groupingPanelItems(columns, draftGrouping)}
                draggingEnabled={draggingEnabled}
                onGroup={groupByColumn}
                onDraftGroup={groupingChange => draftGroupingChange(groupingChange)}
                onCancelDraftGroup={() => cancelGroupingChange()}
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
