import { PureComputed } from '@devexpress/dx-core';
import {
  Grouping, ValidResourceInstance, ViewCell, ValidResource, GroupingItem, AppointmentMoment,
} from '../../types';
import {
  getGroupingItemFromResourceInstance, addGroupInfoToCells,
  groupAppointments, expandGroupedAppointment,
} from './helpers';

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
    return [resource.instances.map(instance => getGroupingItemFromResourceInstance(instance))];
  }

  return [
    ...acc,
    acc[index - 1].reduce((currentResourceNames: Array<GroupingItem>) => [
      ...currentResourceNames,
      ...resource.instances.map(
        (instance: ValidResourceInstance) => getGroupingItemFromResourceInstance(instance),
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

export const updateGroupingWithMainResource: PureComputed<
  [Grouping[] | undefined, ValidResource[]], Grouping[]
> = (grouping, resources) => grouping
  || [{ resourceName: resources.find(resource => resource.isMain)!.fieldName }];

export const expandGroups: PureComputed<
  [AppointmentMoment[][], Grouping[], ValidResource[], GroupingItem[][]], AppointmentMoment[][]
> = (appointments, grouping, resources, groupingItems) => {
  const expandedAppointments = appointments.map(appointmentGroup => appointmentGroup
    .reduce((acc: AppointmentMoment[], appointment: AppointmentMoment) => [
      ...acc,
      ...expandGroupedAppointment(appointment, grouping, resources),
    ], [] as AppointmentMoment[]));
  return groupAppointments(expandedAppointments[0], resources, groupingItems);
};
