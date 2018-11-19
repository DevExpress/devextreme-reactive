import { TABLE_SELECT_TYPE } from './constants';

export const tableColumnsWithSelection = (tableColumns, selectionColumnWidth) => [
  { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: selectionColumnWidth },
  ...tableColumns,
];

export const tableHeaderColumnChainsWithSelection = (
  tableHeaderColumnChains, tableColumns,
) => tableHeaderColumnChains.map(chains => ([
  {
    start: 0,
    columns: [tableColumns[0]],
  },
  ...chains.map(chain => ({
    ...chain,
    start: chain.start + 1,
  })),
]));
