export const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

export const isNumber = (value: string | number) =>
  typeof value === 'number' || !Number.isNaN(Number(value));
