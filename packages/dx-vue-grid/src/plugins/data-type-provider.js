import { DxPlugin, DxTemplate } from '@devexpress/dx-vue-core';

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
  },
  render() {
    const {
      for: columnNames,
      formatterComponent: Formatter,
      editorComponent: Editor,
    } = this;
    return (
      <DxPlugin name="DxDataTypeProvider">
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
