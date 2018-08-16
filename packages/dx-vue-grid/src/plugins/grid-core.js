import {
  DxPlugin, DxGetter, DxTemplate, DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';
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
      <DxPlugin>
        <DxGetter name="rows" value={rows} />
        <DxGetter name="getRowId" value={rowIdGetter(getRowId, rows)} />
        <DxGetter name="columns" value={columns} />
        <DxGetter name="getCellValue" value={cellValueGetter(getCellValue, columns)} />
        <DxTemplate name="root">
          <Root>
            <DxTemplatePlaceholder name="header" />
            <DxTemplatePlaceholder name="body" />
            <DxTemplatePlaceholder name="footer" />
          </Root>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
