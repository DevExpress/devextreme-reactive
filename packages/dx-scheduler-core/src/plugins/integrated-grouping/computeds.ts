import { PureComputed } from '@devexpress/dx-core';
import {
  Grouping, ValidResourceInstance, ViewCell, ValidResource, GroupingItem,
} from '../../types';

export const filterResourcesByGrouping: PureComputed<
  [Array<ValidResource>, Array<Grouping>], Array<ValidResource>
> = (resources, grouping) => resources.filter(
  resource => grouping.find(resourceId => resource.fieldName === resourceId.resourceName),
);

export const sortFilteredResources: PureComputed<
  [Array<ValidResource>, Array<Grouping>], Array<ValidResource>
> = (resources, grouping) => grouping.map(({ resourceName }: Grouping) => (
  resources.find(resource => resource.fieldName === resourceName) as ValidResource
));

export const getGroupingItemsFromResources: PureComputed<
  [Array<ValidResource>], Array<Array<GroupingItem>>
> = sortedAndFilteredResources => sortedAndFilteredResources.reduce((
    acc: Array<Array<GroupingItem>>, resource: ValidResource, index: number,
  ) => {
  if (index === 0) {
    return [resource.instances.slice()];
  }

  return [
    ...acc,
    acc[index - 1].reduce((currentResourceNames: Array<GroupingItem>) => [
      ...currentResourceNames,
      ...resource.instances.map(
        (instance: ValidResourceInstance) => ({
          fieldName: instance.fieldName,
          id: instance.id,
          text: instance.text,
        }),
      ),
    ], []),
  ];
}, []);

export const expandViewCellsDataWithGroups: PureComputed<
  [ViewCell[][], GroupingItem[][], ValidResource[]], ViewCell[][]
> = (viewCellsData, groupingItems, sortedResources) => {
  if (groupingItems.length === 0) return viewCellsData;
  return groupingItems[groupingItems.length - 1].reduce((
    acc: ViewCell[][], groupingItem: GroupingItem, index: number,
  ) => {
    if (index === 0) {
      return viewCellsData.map((viewCellsRow: ViewCell[]) =>
        addGroupInfoToCells(
          groupingItem, groupingItems,
          sortedResources, viewCellsRow, index,
        ) as ViewCell[],
      );
    }
    return acc.map((item: ViewCell[], id: number) => [
      ...item,
      ...addGroupInfoToCells(
        groupingItem,
        groupingItems, sortedResources,
        viewCellsData[id], index,
      ),
    ]);
  }, [[]] as ViewCell[][]);
};

const addGroupInfoToCells: PureComputed<
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
  return { ...viewCell, groupingInfo, isBorderRight: true };
});

export const updateGroupingWithMainResource: PureComputed<
  [Grouping[] | undefined, ValidResource[]], Grouping[]
> = (grouping, resources) => grouping
  || [{ resourceName: resources.find(resource => resource.isMain)!.fieldName }];
