import { PureComputed } from '@devexpress/dx-core';
import { ViewCell, ResourceInstance, Resource } from '../../types';

export const getGroupedViewCellsData: PureComputed<
  [ViewCell[][], ResourceInstance[][], Resource[]], ViewCell[][]
> = (viewCellsData, groupingItems, sortedResources) => {
  if (groupingItems.length === 0) return viewCellsData;
  const groupedViewCellsData = groupingItems[groupingItems.length - 1].reduce((
    acc: ViewCell[][], groupingItem: ResourceInstance, index: number,
  ) => {
    if (index === 0) {
      return viewCellsData.map(viewCellsRow =>
        addGroupInfoToCells(
          groupingItems[groupingItems.length - 1][index], groupingItems,
          sortedResources, viewCellsRow, index,
        ),
      );
    }
    return acc.map((item: ViewCell[], id: number) => {
      const result = addGroupInfoToCells(
        groupingItems[groupingItems.length - 1][index],
        groupingItems, sortedResources,
        viewCellsData[id], index,
      );
      return [...item, ...result];
    });
  }, [[]] as ViewCell[][]);
  return groupedViewCellsData;
};

const addGroupInfoToCells: PureComputed<
  [ResourceInstance, ResourceInstance[][], Resource[], ViewCell[], number], ViewCell[]
> = (currentGroup, groupingItems, sortedResources, viewCellRow, index) => {
  const result = viewCellRow.map((
    viewCell: ViewCell,
  ) => {
    const lastIndex = groupingItems.length - 1;
    let previousIndex = index;
    const groupingInfo = groupingItems.reduce((
      acc: ResourceInstance[], groupingItem: ResourceInstance[], index: number,
    ) => {
      if (index === 0) return acc;
      const currentIndex = lastIndex - index;
      const previousGroupingItem = lastIndex - index + 1;
      const previousResourceLength = sortedResources[previousGroupingItem].instances.length;
      const currentResourceInstance = groupingItems[currentIndex][Math.floor(
        previousIndex / previousResourceLength,
      )];
      previousIndex = currentIndex;
      return [...acc, currentResourceInstance];
    }, [currentGroup]);
    return { ...viewCell, groupingInfo };
  });
  return result;
};
