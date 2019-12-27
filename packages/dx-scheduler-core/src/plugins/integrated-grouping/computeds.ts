import { PureComputed } from '@devexpress/dx-core';
import {
  Grouping, ValidResourceInstance, ViewCell, ValidResource, Group, AppointmentMoment,
} from '../../types';
import {
  getGroupFromResourceInstance, addGroupInfoToCells,
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

export const getGroupsFromResources: PureComputed<
  [Array<ValidResource>], Array<Array<Group>>
> = sortedAndFilteredResources => sortedAndFilteredResources.reduce((
    acc: Array<Array<Group>>, resource: ValidResource, index: number,
  ) => {
  if (index === 0) {
    return [resource.instances.map(instance => getGroupFromResourceInstance(instance))];
  }

  return [
    ...acc,
    acc[index - 1].reduce((currentResourceNames: Array<Group>) => [
      ...currentResourceNames,
      ...resource.instances.map(
        (instance: ValidResourceInstance) => getGroupFromResourceInstance(instance),
      ),
    ], []),
  ];
}, []);

export const expandViewCellsDataWithGroups: PureComputed<
  [ViewCell[][], Group[][], ValidResource[]], ViewCell[][]
> = (viewCellsData, groups, sortedResources) => {
  if (groups.length === 0) return viewCellsData;
  return groups[groups.length - 1].reduce((
    acc: ViewCell[][], group: Group, index: number,
  ) => {
    if (index === 0) {
      return viewCellsData.map((viewCellsRow: ViewCell[]) =>
        addGroupInfoToCells(
          group, groups,
          sortedResources, viewCellsRow, index,
        ) as ViewCell[],
      );
    }
    return acc.map((item: ViewCell[], id: number) => [
      ...item,
      ...addGroupInfoToCells(
        group,
        groups, sortedResources,
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
  [AppointmentMoment[][], Grouping[], ValidResource[], Group[][]], AppointmentMoment[][]
> = (appointments, grouping, resources, groups) => {
  const expandedAppointments = appointments.map(appointmentGroup => appointmentGroup
    .reduce((acc: AppointmentMoment[], appointment: AppointmentMoment) => [
      ...acc,
      ...expandGroupedAppointment(appointment, grouping, resources),
    ], [] as AppointmentMoment[]));
  return groupAppointments(expandedAppointments[0], resources, groups);
};
