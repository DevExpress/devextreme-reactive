import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-vue-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';

export const GridCore = {
  name: 'GridCore',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    getRowId: {
      type: Function,
    },
    getCellValue: {
      type: Function,
    },
    columns: {
      type: Array,
      required: true,
    },
    rootComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      rows,
      columns,
      getRowId,
      getCellValue,
      rootComponent: Root,
    } = this;

    return (
      <Plugin>
        <Getter name="rows" value={rows} />
        <Getter name="getRowId" value={rowIdGetter(getRowId, rows)} />
        <Getter name="columns" value={columns} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue, columns)} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  },
};
