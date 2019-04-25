export const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);
