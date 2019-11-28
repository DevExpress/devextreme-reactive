import { PureComputed } from '@devexpress/dx-core';
import { Grouping, ValidResourceInstance, ViewCell, ValidResource } from '../../types';

export const filterResourcesByGrouping: PureComputed<
  [Array<ValidResource>, Array<Grouping>], Array<ValidResource>
> = (resources, grouping) => resources.filter(
  resource => grouping.find(resourceId => resource.fieldName === resourceId.resourceName),
);

export const sortFilteredResources: PureComputed<
  [Array<ValidResource>, Array<Grouping>], Array<ValidResource>
> = (resources, grouping) => {
  return grouping.map(({ resourceName }: Grouping) => {
    return resources.find(resource => resource.fieldName === resourceName) as ValidResource;
  });
};

export const getGroupingItemsFromResources: PureComputed<
  [Array<ValidResource>], Array<Array<ValidResourceInstance>>
> = sortedAndFilteredResources => sortedAndFilteredResources.reduce((
    acc: Array<Array<ValidResourceInstance>>, resource: ValidResource, index: number,
  ) => {
  if (index === 0) {
    return [resource.instances.slice()];
  }
  const result = acc[index - 1].reduce((currentResourceNames: Array<ValidResourceInstance>) => [
    ...currentResourceNames,
    ...resource.instances.map(
      (instance: ValidResourceInstance) => instance,
    ),
  ], []);
  return [...acc, result];
}, []);

export const expandViewCellsDataWithGroups: PureComputed<
  [ViewCell[][], ValidResourceInstance[][], ValidResource[]], ViewCell[][]
> = (viewCellsData, groupingItems, sortedResources) => {
  if (groupingItems.length === 0) return viewCellsData;
  return groupingItems[groupingItems.length - 1].reduce((
    acc: ViewCell[][], groupingItem: ValidResourceInstance, index: number,
  ) => {
    if (index === 0) {
      return viewCellsData.map((viewCellsRow: ViewCell[]) =>
        addGroupInfoToCells(
          groupingItem, groupingItems,
          sortedResources, viewCellsRow, index,
        ) as ViewCell[],
      );
    }
    return acc.map((item: ViewCell[], id: number) => {
      const result = addGroupInfoToCells(
        groupingItem,
        groupingItems, sortedResources,
        viewCellsData[id], index,
      );
      return [...item, ...result];
    });
  }, [[]] as ViewCell[][]);
};

const addGroupInfoToCells: PureComputed<
  [ValidResourceInstance, ValidResourceInstance[][],
  ValidResource[], ViewCell[], number], ViewCell[]
> = (currentGroup, groupingItems, sortedResources, viewCellRow, index) => viewCellRow.map((
    viewCell: ViewCell, cellIndex: number,
  ) => {
  let previousIndex = index;
  const groupingInfo = groupingItems.reduceRight((
    acc: ValidResourceInstance[], groupingItem: ValidResourceInstance[], currentIndex: number,
  ) => {
    if (currentIndex === groupingItems.length - 1) return acc;
    const previousResourceLength = sortedResources[currentIndex + 1].instances.length;
    const currentResourceInstance = groupingItem[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentResourceInstance];
  }, [currentGroup]);
  if (cellIndex !== viewCellRow.length - 1) {
    return { ...viewCell, groupingInfo };
  }
  return { ...viewCell, groupingInfo, isLastHorizontalGroupCell: true };
});
