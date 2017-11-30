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
      itemComponent: Item,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

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
                  allowDragging={allowDragging}
                  onGroup={groupByColumn}
                  getMessage={getMessage}
                  items={groupingPanelItems(columns, draftGrouping)}
                  onDraftGroup={groupingChange => draftGroupingChange(groupingChange)}
                  onCancelDraftGroup={() => cancelGroupingChange()}
                  itemComponent={ItemPlaceholder}
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
  itemComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
  messages: {},
};
