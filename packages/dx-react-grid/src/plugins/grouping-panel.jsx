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
      allowDragging,
      showGroupingControls,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    const EmptyMessagePlaceholder = () => (
      <EmptyMessage
        getMessage={getMessage}
      />
    );

    const ItemPlaceholder = ({ item }) => (
      <TemplateConnector>
        {({ sorting, getSortingColumnExtension }, { groupByColumn, setColumnSorting }) => {
          const { name: columnName } = item.column;
          const sortingExtension = getSortingColumnExtension
            ? getSortingColumnExtension(columnName)
            : { enabled: false };

          return (
            <Item
              item={item}
              allowSorting={sortingExtension.enabled}
              sortingDirection={sorting !== undefined
                ? getColumnSortingDirection(sorting, columnName) : undefined}
              showGroupingControls={showGroupingControls}
              onGroup={() => groupByColumn({ columnName })}
              onSort={({ keepOther, cancel }) =>
                setColumnSorting({ columnName, keepOther, cancel })}
            />
          );
        }}
      </TemplateConnector>
    );

    return (
      <PluginContainer
        pluginName="GroupingPanel"
        dependencies={[
          { pluginName: 'GroupingState' },
          { pluginName: 'Toolbar' },
          { pluginName: 'SortingState', optional: true },
        ]}
      >
        <Template name="toolbarContent">
          <TemplateConnector>
            {({
              columns, draftGrouping,
            }, {
              groupByColumn, draftGroupingChange, cancelGroupingChange,
            }) => (
              <Layout
                items={groupingPanelItems(columns, draftGrouping)}
                allowDragging={allowDragging}
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
  allowDragging: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  layoutComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  allowDragging: false,
  showGroupingControls: false,
  messages: {},
};
