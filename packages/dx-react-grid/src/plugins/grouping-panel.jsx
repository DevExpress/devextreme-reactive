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
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
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
          {({ sorting }, { groupByColumn, setColumnSorting }) => (
            <Item
              item={item}
              allowSorting={allowSorting && sorting !== undefined}
              sortingDirection={sorting !== undefined
                ? getColumnSortingDirection(sorting, columnName) : undefined}
              allowUngroupingByClick={allowUngroupingByClick}
              onGroup={() => groupByColumn({ columnName })}
              onSort={({ keepOther, cancel }) =>
                setColumnSorting({ columnName, keepOther, cancel })}
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
          { pluginName: 'SortingState', optional: !allowSorting },
        ]}
      >
        <Template name="header">
          <div>
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
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
  layoutComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
  messages: {},
};
