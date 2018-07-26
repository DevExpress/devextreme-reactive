import { DxPlugin, DxTemplate, DxGetter } from '@devexpress/dx-vue-core';
import { getAvailableFilterOperationsGetter } from '@devexpress/dx-grid-core';

export const DxDataTypeProvider = {
  name: 'DxDataTypeProvider',
  props: {
    for: {
      type: Array,
      required: true,
    },
    formatterComponent: {
      type: Object,
    },
    editorComponent: {
      type: Object,
    },
    availableFilterOperations: {
      type: Array,
    },
  },
  render() {
    const {
      for: columnNames,
      formatterComponent: Formatter,
      editorComponent: Editor,
      availableFilterOperations,
    } = this;

    const getAvailableFilterOperationsComputed = (
      { getAvailableFilterOperations },
    ) => getAvailableFilterOperationsGetter(
      getAvailableFilterOperations,
      availableFilterOperations,
      columnNames,
    );

    return (
      <DxPlugin name="DxDataTypeProvider">
        <DxGetter name="getAvailableFilterOperations" computed={getAvailableFilterOperationsComputed} />
        {Formatter
          ? (
            <DxTemplate
              name="valueFormatter"
              predicate={({ attrs: { column } }) => columnNames.includes(column.name)}
            >
              {({ attrs }) => <Formatter {...{ attrs }} />}
            </DxTemplate>
          )
          : null
        }
        {Editor
          ? (
            <DxTemplate
              name="valueEditor"
              predicate={({ attrs: { column } }) => columnNames.includes(column.name)}
            >
              {({ attrs, listeners }) => (
                <Editor {...{ attrs: { ...attrs }, on: { ...listeners } }} />
              )}
            </DxTemplate>
          )
          : null
        }
      </DxPlugin>
    );
  },
};
