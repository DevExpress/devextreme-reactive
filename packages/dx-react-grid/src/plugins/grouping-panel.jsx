import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
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
          {({ sorting }, { changeColumnGrouping, changeColumnSorting }) => (
            <Item
              item={item}
              showSortingControls={showSortingControls && sorting !== undefined}
              sortingDirection={sorting !== undefined
                ? getColumnSortingDirection(sorting, columnName) : undefined}
              showGroupingControls={showGroupingControls}
              onGroup={() => changeColumnGrouping({ columnName })}
              onSort={({ direction, keepOther }) =>
                changeColumnSorting({ columnName, direction, keepOther })}
            />
          )}
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
              columns, grouping, draftGrouping, draggingEnabled,
            }, {
              changeColumnGrouping, draftColumnGrouping, cancelColumnGroupingDraft,
            }) => (
              <Layout
                items={groupingPanelItems(columns, grouping, draftGrouping)}
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
