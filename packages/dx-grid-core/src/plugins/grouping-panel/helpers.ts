import { GroupingPanelItemsFn } from '../../types/';

export const groupingPanelItems: GroupingPanelItemsFn = (
  columns, grouping, draftGrouping,
) => {
  const items = draftGrouping.map(({ columnName }) => ({
    column: columns.find(c => c.name === columnName)!,
    draft: !grouping.some(columnGrouping => columnGrouping.columnName === columnName),
  }));

  grouping.forEach(({ columnName }, index) => {
    if (draftGrouping.some(columnGrouping => columnGrouping.columnName === columnName)) return;
    items.splice(index, 0, {
      column: columns.find(c => c.name === columnName)!,
      draft: true,
    });
  });

  return items;
};
