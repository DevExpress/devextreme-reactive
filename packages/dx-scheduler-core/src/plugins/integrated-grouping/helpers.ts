import { PureComputed } from '@devexpress/dx-core';
import { ValidResourceInstance, GroupingItem, ViewCell, ValidResource } from '../../types';

export const getGroupingItemFromResourceInstance: PureComputed<
  [ValidResourceInstance], GroupingItem
> = resourceInstance => ({
  id: resourceInstance.id,
  fieldName: resourceInstance.fieldName,
  text: resourceInstance.text,
});

export const addGroupInfoToCells: PureComputed<
  [GroupingItem, GroupingItem[][],
  ValidResource[], ViewCell[], number], ViewCell[]
> = (currentGroup, groupingItems, sortedResources, viewCellRow, index) => viewCellRow.map((
    viewCell: ViewCell, cellIndex: number,
  ) => {
  let previousIndex = index;
  const groupingInfo = groupingItems.reduceRight((
    acc: GroupingItem[], groupingItem: GroupingItem[], currentIndex: number,
  ) => {
    if (currentIndex === groupingItems.length - 1) return acc;
    const previousResourceLength = sortedResources[currentIndex + 1].instances.length;
    const currentGroupingInstance = groupingItem[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentGroupingInstance];
  }, [currentGroup]);
  if (cellIndex !== viewCellRow.length - 1) {
    return { ...viewCell, groupingInfo };
  }
  return { ...viewCell, groupingInfo, hasRightBorder: true };
});
