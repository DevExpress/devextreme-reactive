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
      groupPanelComponent: GroupPanel,
      groupPanelItemComponent: GroupPanelItem,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    const Item = ({ item }) => {
      const { name: columnName } = item.column;
      return (
        <TemplateConnector>
          {({ sorting }, { groupByColumn, setColumnSorting }) => (
            <GroupPanelItem
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
                <GroupPanel
                  allowDragging={allowDragging}
                  onGroup={groupByColumn}
                  getMessage={getMessage}
                  items={groupingPanelItems(columns, draftGrouping)}
                  onDraftGroup={groupingChange => draftGroupingChange(groupingChange)}
                  onCancelDraftGroup={() => cancelGroupingChange()}
                  groupPanelItemComponent={Item}
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
  groupPanelComponent: PropTypes.func.isRequired,
  groupPanelItemComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
  messages: {},
};
