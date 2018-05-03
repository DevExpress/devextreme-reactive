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
              predicate={({ column }) => columnNames.includes(column.name)}
            >
              {params => <Formatter {...{ attrs: { ...params } }} />}
            </DxTemplate>
          )
          : null
        }
        {Editor
          ? (
            <DxTemplate
              name="valueEditor"
              predicate={({ column }) => columnNames.includes(column.name)}
            >
              {params => <Editor {...{ attrs: { ...params } }} />}
            </DxTemplate>
          )
          : null
        }
      </DxPlugin>
    );
  },
};
