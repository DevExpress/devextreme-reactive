import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-vue-core';
import {
  groupingPanelItems,
  getColumnSortingDirection,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

export const GroupingPanel = {
  props: {
    showSortingControls: {
      type: Boolean,
    },
    showGroupingControls: {
      type: Boolean,
    },
    messages: {
      type: Object,
    },
    layoutComponent: {
      type: Object,
      required: true,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
    itemComponent: {
      type: Object,
      required: true,
    },
    emptyMessageComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      layoutComponent: Layout,
      containerComponent: Container,
      itemComponent: Item,
      emptyMessageComponent: EmptyMessage,
      showSortingControls,
      showGroupingControls,
      messages,
    } = this;

    const getMessage = getMessagesFormatter(messages);

    const EmptyMessagePlaceholder = {
      render() {
        return (
          <EmptyMessage
            getMessage={getMessage}
          />
        );
      },
    };

    const ItemPlaceholder = {
      props: {
        item: {
          type: Object,
          required: true,
        },
      },
      render() {
        const { name: columnName } = this.item.column;

        return (
          <TemplateConnector>
            {({
              getters: {
                sorting, isColumnSortingEnabled, isColumnGroupingEnabled,
              },
              actions: {
                changeColumnGrouping, changeColumnSorting,
              },
            }) => {
              const sortingEnabled =
                isColumnSortingEnabled && isColumnSortingEnabled(columnName);
              const groupingEnabled =
                isColumnGroupingEnabled && isColumnGroupingEnabled(columnName);

              return (
                <Item
                  item={this.item}
                  sortingEnabled={sortingEnabled}
                  groupingEnabled={groupingEnabled}
                  showSortingControls={showSortingControls}
                  sortingDirection={showSortingControls
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
      },
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
          <div style={{ display: 'flex', flex: 1 }}>
            <TemplateConnector>
              {({
                getters: {
                  columns, grouping, isColumnGroupingEnabled,
                },
                actions: {
                  changeColumnGrouping,
                },
              }) => (
                <Layout
                  items={groupingPanelItems(columns, grouping, [])}
                  isColumnGroupingEnabled={isColumnGroupingEnabled}
                  onGroup={changeColumnGrouping}
                  itemComponent={ItemPlaceholder}
                  emptyMessageComponent={EmptyMessagePlaceholder}
                  containerComponent={Container}
                />
              )}
            </TemplateConnector>
            <TemplatePlaceholder />
          </div>
        </Template>
      </Plugin>
    );
  },
};
