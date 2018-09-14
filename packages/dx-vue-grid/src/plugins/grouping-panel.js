import {
  DxTemplate,
  DxTemplatePlaceholder,
  DxPlugin,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  groupingPanelItems,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';

export const DxGroupingPanel = {
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
          <DxTemplateConnector>
            {({
              getters: {
                sorting, isColumnSortingEnabled, isColumnGroupingEnabled,
              },
              actions: {
                changeColumnGrouping, changeColumnSorting,
              },
            }) => {
              const sortingEnabled = isColumnSortingEnabled && isColumnSortingEnabled(columnName);
              const groupingEnabled = isColumnGroupingEnabled
              && isColumnGroupingEnabled(columnName);

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
                  onSort={(
                    { direction, keepOther },
                  ) => changeColumnSorting({ columnName, direction, keepOther })}
                />
              );
            }}
          </DxTemplateConnector>
        );
      },
    };

    return (
      <DxPlugin
        name="DxGroupingPanel"
        dependencies={[
          { name: 'DxGroupingState' },
          { name: 'DxToolbar' },
          { name: 'DxSortingState', optional: !showSortingControls },
        ]}
      >
        <DxTemplate name="toolbarContent">
          <div style={{ display: 'flex', flex: 1 }}>
            <DxTemplateConnector>
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
            </DxTemplateConnector>
            <DxTemplatePlaceholder />
          </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
