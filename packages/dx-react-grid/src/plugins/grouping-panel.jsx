import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector, withComponents,
} from '@devexpress/dx-react-core';
import {
  groupingPanelItems,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';
import { GroupPanelLayout as Layout } from '../components/group-panel-layout';

const defaultMessages = {
  groupByColumn: 'Drag a column header here to group by that column',
};

class GroupingPanelRaw extends React.PureComponent {
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
                  ? getColumnSortingDirection(sorting, columnName) : undefined}
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
            }, {
              changeColumnGrouping, draftColumnGrouping, cancelColumnGroupingDraft,
            }) => (
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

GroupingPanelRaw.propTypes = {
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  layoutComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanelRaw.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
  messages: {},
};

GroupingPanelRaw.components = {
  layoutComponent: 'Layout',
  containerComponent: 'Container',
  itemComponent: 'Item',
  emptyMessageComponent: 'EmptyMessage',
};

export const GroupingPanel = withComponents({ Layout })(GroupingPanelRaw);
