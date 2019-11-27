import { PureComputed } from '@devexpress/dx-core';
import { Resource, Grouping, ResourceInstance, ViewCell } from '../../types';

export const filterResourcesByGrouping: PureComputed<
  [Array<Resource>, Array<Grouping>], Array<Resource>
> = (resources, grouping) => resources.filter(
  resource => grouping.find(resourceId => resource.fieldName === resourceId.resourceName),
);

export const sortFilteredResources: PureComputed<
  [Array<Resource>, Array<Grouping>], Array<Resource>
> = (resources, grouping) => {
  return grouping.map(({ resourceName }: Grouping) => {
    return resources.find(resource => resource.fieldName === resourceName) as Resource;
  });
};

export const getGroupingItemsFromResources: PureComputed<
  [Array<Resource>], Array<Array<ResourceInstance>>
> = sortedAndFilteredResources => sortedAndFilteredResources.reduce((
    acc: Array<Array<ResourceInstance>>, resource: Resource, index: number,
  ) => {
  if (index === 0) {
    return [resource.instances.slice()];
  }
  const result = acc[index - 1].reduce((currentResourceNames: Array<ResourceInstance>) => [
    ...currentResourceNames,
    ...resource.instances.map(
      (instance: ResourceInstance) => instance,
    ),
  ], []);
  return [...acc, result];
}, []);

export const expandViewCellsDataWithGroups: PureComputed<
  [ViewCell[][], ResourceInstance[][], Resource[]], ViewCell[][]
> = (viewCellsData, groupingItems, sortedResources) => {
  if (groupingItems.length === 0) return viewCellsData;
  return groupingItems[groupingItems.length - 1].reduce((
    acc: ViewCell[][], groupingItem: ResourceInstance, index: number,
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
  [ResourceInstance, ResourceInstance[][], Resource[], ViewCell[], number], ViewCell[]
> = (currentGroup, groupingItems, sortedResources, viewCellRow, index) => viewCellRow.map((
    viewCell: ViewCell,
  ) => {
  let previousIndex = index;
  const groupingInfo = groupingItems.reduceRight((
    acc: ResourceInstance[], groupingItem: ResourceInstance[], currentIndex: number,
  ) => {
    if (currentIndex === groupingItems.length - 1) return acc;
    const previousResourceLength = sortedResources[currentIndex + 1].instances.length;
    const currentResourceInstance = groupingItem[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentResourceInstance];
  }, [currentGroup]);
  return { ...viewCell, groupingInfo };
});
