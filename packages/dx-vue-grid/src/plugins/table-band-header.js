import {
  DxGetter, DxTemplate, DxPlugin,
  DxTemplateConnector, DxTemplatePlaceholderSlot, DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';
import {
  getBandComponent,
  isBandedTableRow, isBandedOrHeaderRow,
  tableRowsWithBands, isHeadingTableCell,
  BAND_GROUP_CELL, BAND_HEADER_CELL,
  BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = {
  props: {
    params: null,
  },
  render() {
    return <DxTemplatePlaceholder params={this.params} />;
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

    const tableHeaderRowsComputed = ({ tableHeaderRows, tableColumns }) =>
      tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

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
          predicate={({ tableRow }) => isBandedOrHeaderRow(tableRow)}
        >
          {params => (
            <DxTemplateConnector>
              {({
                getters: { tableColumns, tableHeaderRows },
              }) => {
                const bandComponent =
                  getBandComponent(params, tableHeaderRows, tableColumns, columnBands);
                switch (bandComponent.type) {
                  case BAND_DUPLICATE_RENDER:
                    return <DxTemplatePlaceholder params={params}/>;
                  case BAND_EMPTY_CELL:
                    return <InvisibleCell />;
                  case BAND_GROUP_CELL: {
                    const { value, ...payload } = bandComponent.payload;
                    return (
                      <Cell {...{ attrs: { ...params, ...payload } }}>
                        {value}
                      </Cell>
                    );
                  }
                  case BAND_HEADER_CELL:
                    return (
                      <DxTemplatePlaceholder
                        name="tableCell"
                        params={{ ...params, ...bandComponent.payload }}
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
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => <HeaderCell component={CellPlaceholder} {...{ attrs: { ...params } }} />}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isBandedTableRow(tableRow)}
        >
          {params => (
            <Row {...{ attrs: { ...params } }}>
              <DxTemplatePlaceholderSlot params={params} />
            </Row>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
