import {
  DxGetter, DxTemplate, DxPlugin,
  DxTemplateConnector, DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';
import {
  getBandComponent,
  isBandedTableRow, isBandedOrHeaderRow,
  tableRowsWithBands, isHeadingTableCell,
  BAND_GROUP_CELL, BAND_HEADER_CELL,
  BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = {
  render() {
    return <DxTemplatePlaceholder />;
  },
};

export const DxTableBandHeader = {
  name: 'DxTableBandHeader',
  props: {
    columnBands: {
      type: Array,
    },
    cellComponent: {
      type: Object,
    },
    rowComponent: {
      type: Object,
    },
    bandedHeaderCellComponent: {
      type: Object,
    },
    invisibleCellComponent: {
      type: Object,
    },
  },
  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      bandedHeaderCellComponent: HeaderCell,
      invisibleCellComponent: InvisibleCell,
      columnBands,
    } = this;

    const tableHeaderRowsComputed = (
      { tableHeaderRows, tableColumns },
    ) => tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

    return (
      <DxPlugin
        name="DxTableBandHeader"
        dependencies={[
          { name: 'DxTable' },
          { name: 'DxTableHeaderRow' },
          { name: 'DxTableSelection', optional: true },
          { name: 'DxTableEditColumn', optional: true },
        ]}
      >
        <DxGetter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <DxTemplate
          name="tableCell"
          predicate={({ attrs: { tableRow } }) => isBandedOrHeaderRow(tableRow)}
        >
          {({ attrs }) => (
            <DxTemplateConnector>
              {({
                getters: { tableColumns, tableHeaderRows },
              }) => {
                const bandComponent = getBandComponent(
                  attrs, tableHeaderRows, tableColumns, columnBands,
                );

                switch (bandComponent.type) {
                  case BAND_DUPLICATE_RENDER:
                    return (
                      <DxTemplatePlaceholder
                        colSpan={attrs.colSpan}
                        tableColumn={attrs.tableColumn}
                        tableRow={attrs.tableRow}
                        rowSpan={attrs.rowSpan}
                      />
                    );
                  case BAND_EMPTY_CELL:
                    return <InvisibleCell />;
                  case BAND_GROUP_CELL: {
                    const { value, ...payload } = bandComponent.payload;
                    return (
                      <Cell {...{ attrs: { ...attrs, ...payload } }}>
                        {value}
                      </Cell>
                    );
                  }
                  case BAND_HEADER_CELL:
                    return (
                      <DxTemplatePlaceholder
                        name="tableCell"
                        colSpan={attrs.colSpan}
                        tableColumn={attrs.tableColumn}
                        tableRow={bandComponent.payload.tableRow}
                        rowSpan={bandComponent.payload.rowSpan}
                      />
                    );
                  default:
                    return null;
                }
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {({ attrs }) => <HeaderCell component={CellPlaceholder} {...{ attrs: { ...attrs } }} />}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ attrs: { tableRow } }) => isBandedTableRow(tableRow)}
        >
          {({ attrs, slots }) => (
            <Row {...{ attrs: { ...attrs } }}>
              {slots.default}
            </Row>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
