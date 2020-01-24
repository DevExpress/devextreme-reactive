import { PureComputed } from '@devexpress/dx-core';
import {
  Grouping, ValidResourceInstance, ViewCell, ValidResource,
  Group, AppointmentMoment, ExpandGroupingPanelCellFn, GroupOrientation,
} from '../../types';
import {
  getGroupFromResourceInstance, addGroupInfoToCells,
  groupAppointments, expandGroupedAppointment, addGroupInfoToCell,
} from './helpers';
import { sliceAppointmentsByDays } from '../all-day-panel/helpers';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';

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
  [ViewCell[][], Group[][], ValidResource[], boolean, GroupOrientation], ViewCell[][]
> = (viewCellsData, groups, sortedResources, groupByDate, groupOrientation) => {
  if (groups.length === 0) return viewCellsData;
  if (groupByDate) {
    return expandCellsWithGroupedByDateData(viewCellsData, groups, sortedResources);
  }
  if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION){
    return expandHorizontallyGroupedCells(viewCellsData, groups, sortedResources);
  }
  return expandVerticallyGroupedCells(viewCellsData, groups, sortedResources);
};

const expandCellsWithGroupedByDateData: ExpandGroupingPanelCellFn = (
  viewCellsData, groups, sortedResources,
) => viewCellsData.map(
  (cellsRow: ViewCell[]) => cellsRow.reduce((acc: ViewCell[], viewCell: ViewCell) => {
    const groupedCells = groups[groups.length - 1].map((
      group: Group, index: number,
    ) => addGroupInfoToCell(
      group, groups, sortedResources, viewCell, index,
      false, HORIZONTAL_GROUP_ORIENTATION,
    ));
    groupedCells[groupedCells.length - 1] = {
      ...groupedCells[groupedCells.length - 1],
      endOfGroup: true,
    };
    return [...acc, ...groupedCells] as ViewCell[];
  }, [] as ViewCell[]),
);

const expandHorizontallyGroupedCells: ExpandGroupingPanelCellFn = (
  viewCellsData, groups, sortedResources,
) => groups[groups.length - 1].reduce((
  acc: ViewCell[][], group: Group, index: number,
) => {
  if (index === 0) {
    return viewCellsData.map((viewCellsRow: ViewCell[]) =>
      addGroupInfoToCells(
        group, groups, sortedResources, viewCellsRow, index,
        false, HORIZONTAL_GROUP_ORIENTATION,
      ) as ViewCell[],
    );
  }
  return acc.map((item: ViewCell[], id: number) => [
    ...item,
    ...addGroupInfoToCells(
      group, groups, sortedResources, viewCellsData[id], index,
      false, HORIZONTAL_GROUP_ORIENTATION,
    ),
  ]);
}, [[]] as ViewCell[][]);

const expandVerticallyGroupedCells: ExpandGroupingPanelCellFn = (
  viewCellsData, groups, sortedResources,
) => groups[groups.length - 1].reduce((
  acc: ViewCell[][], group: Group, index: number,
) => {
  if (index === 0) {
    return viewCellsData.map((viewCellsRow: ViewCell[], viewRowIndex: number) => {
      return addGroupInfoToCells(
        group, groups, sortedResources, viewCellsRow,
        index, viewRowIndex === viewCellsData.length - 1, VERTICAL_GROUP_ORIENTATION,
      ) as ViewCell[];
    });
  }
  return [
    ...acc,
    ...viewCellsData.map((viewCellsRow: ViewCell[], viewRowIndex: number) =>
      addGroupInfoToCells(
        group, groups, sortedResources, viewCellsRow,
        index, viewRowIndex === viewCellsData.length - 1, VERTICAL_GROUP_ORIENTATION,
      ) as ViewCell[],
    ),
  ];
}, [[]] as ViewCell[][]);

export const updateGroupingWithMainResource: PureComputed<
  [Grouping[] | undefined, ValidResource[]], Grouping[]
> = (grouping, resources) => grouping
  || [{ resourceName: resources.find(resource => resource.isMain)!.fieldName }];

export const expandGroups: PureComputed<
  [AppointmentMoment[][], Grouping[], ValidResource[],
  Group[][], number[], boolean], AppointmentMoment[][]
> = (appointments, grouping, resources, groups, excludedDays, sliceByDay = false) => {
  const slicedAppointments = sliceByDay ?
    appointments[0].reduce((acc: AppointmentMoment[], appointment: AppointmentMoment) => ([
      ...acc,
      ...sliceAppointmentsByDays(appointment, excludedDays),
    ]), [] as AppointmentMoment[]) : appointments[0];

  const expandedAppointments = (slicedAppointments as AppointmentMoment[])
    .reduce((acc: AppointmentMoment[], appointment: AppointmentMoment) => [
      ...acc,
      ...expandGroupedAppointment(appointment, grouping, resources),
    ], [] as AppointmentMoment[]);
  return groupAppointments(expandedAppointments, resources, groups);
};
