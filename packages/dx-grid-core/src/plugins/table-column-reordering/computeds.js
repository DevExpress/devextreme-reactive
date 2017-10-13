import { TABLE_DATA_TYPE } from '../table-view/constants';

export const orderedColumns = (tableColumns, order) => {
  const result = Array.from(tableColumns);

  result.sort((a, b) => {
    if (a.type !== TABLE_DATA_TYPE || b.type !== TABLE_DATA_TYPE) return 0;

    const aPos = order.indexOf(a.column.name);
    const bPos = order.indexOf(b.column.name);
    return aPos - bPos;
  });

  return result;
};
