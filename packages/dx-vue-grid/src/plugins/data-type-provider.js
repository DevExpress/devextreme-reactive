import { Plugin, Template } from '@devexpress/dx-vue-core';

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
      <Plugin name="DxDataTypeProvider">
        {Formatter
          ? (
            <Template
              name="valueFormatter"
              predicate={({ column }) => columnNames.includes(column.name)}
            >
              {params => <Formatter {...{ attrs: { ...params } }} />}
            </Template>
          )
          : null
        }
        {Editor
          ? (
            <Template
              name="valueEditor"
              predicate={({ column }) => columnNames.includes(column.name)}
            >
              {params => <Editor {...{ attrs: { ...params } }} />}
            </Template>
          )
          : null
        }
      </Plugin>
    );
  },
};
