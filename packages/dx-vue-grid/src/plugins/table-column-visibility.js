import {
  DxGetter,
  DxAction,
  DxPlugin,
  DxTemplate,
  DxTemplateConnector,
  DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  toggleColumn,
  visibleTableColumns,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxTable' },
];

const visibleTableColumnsComputed = (
  { tableColumns, hiddenColumnNames },
) => visibleTableColumns(tableColumns, hiddenColumnNames);

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'togglingEnabled', defaultValue);

export const DxTableColumnVisibility = {
  name: 'DxTableColumnVisibility',
  props: {
    hiddenColumnNames: {
      type: Array,
      required: true,
    },
    emptyMessageComponent: {
      type: Object,
      required: true,
    },
    messages: {
      type: Object,
    },
    columnExtensions: {
      type: Array,
    },
    columnTogglingEnabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleColumnVisibility(columnName) {
      this.$emit(
        'update:hiddenColumnNames',
        toggleColumn(this.hiddenColumnNames, columnName),
      );
    },
  },
  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
      hiddenColumnNames,
      columnExtensions,
      columnTogglingEnabled,
    } = this;
    const getMessage = getMessagesFormatter(messages);
    return (
      <DxPlugin
        name="DxTableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <DxGetter name="hiddenColumnNames" value={hiddenColumnNames} />
        <DxGetter name="tableColumns" computed={visibleTableColumnsComputed} />
        <DxGetter
          name="isColumnTogglingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnTogglingEnabled)}
        />
        <DxAction
          name="toggleColumnVisibility"
          action={this.toggleColumnVisibility}
        />

        <DxTemplate name="table">
          {attrs => (
            <DxTemplateConnector>
              {({ getters: { tableColumns } }) => (tableDataColumnsExist(tableColumns)
                ? <DxTemplatePlaceholder />
                : <EmptyMessage
                    getMessage={getMessage}
                    {...{ attrs }}
                />
              )}
            </DxTemplateConnector>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
