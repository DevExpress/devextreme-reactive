import { PureComputed } from '@devexpress/dx-core';
import {
  ValidResourceInstance, Group, ViewCell,
  ValidResource, AppointmentMoment, Grouping, GroupOrientation,
} from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

export const getGroupFromResourceInstance: PureComputed<
  [ValidResourceInstance], Group
> = resourceInstance => ({
  id: resourceInstance.id,
  fieldName: resourceInstance.fieldName,
  text: resourceInstance.text,
});

export const addGroupInfoToCells: PureComputed<
  [Group, Group[][], ValidResource[],
  ViewCell[], number, boolean, GroupOrientation], ViewCell[]
> = (
  currentGroup, groups, sortedResources, viewCellRow, index, endOfGroup, groupOrientation,
) => viewCellRow.map((
    viewCell: ViewCell, cellIndex: number,
  ) => {
  const groupedCell = addGroupInfoToCell(
    currentGroup, groups, sortedResources, viewCell, index, endOfGroup, groupOrientation,
  ) as ViewCell;
  return cellIndex === viewCellRow.length - 1 && groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? { ...groupedCell, endOfGroup: true }
    : groupedCell;
});

export const addGroupInfoToCell: PureComputed<
  [Group, Group[][], ValidResource[],
  ViewCell, number, boolean, GroupOrientation], ViewCell
> = (currentGroup, groups, sortedResources, viewCell, index, endOfGroup, groupOrientation) => {
  let previousIndex = index;
  const groupingInfo = groups.reduceRight((
    acc: Group[], group: Group[], currentIndex: number,
  ) => {
    if (currentIndex === groups.length - 1) return acc;
    const previousResourceLength = sortedResources[currentIndex + 1].instances.length;
    const currentGroupingInstance = group[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentGroupingInstance];
  }, [currentGroup]);
  return { ...viewCell, groupingInfo, endOfGroup, groupOrientation };
};

const getCurrentGroup: PureComputed<
  [Group[][], ValidResource[], number, Group], Group[]
> = (groups, resources, index, group) => {
  let currentIndex = index;
  return groups.reduceRight((groupAcc, groupsRow, rowIndex) => {
    if (rowIndex === groups!.length - 1) {
      return groupAcc;
    }
    currentIndex = Math.floor(currentIndex / resources[rowIndex + 1].instances.length);
    const currentInstance = groupsRow[currentIndex];
    return [
      ...groupAcc,
      currentInstance,
    ];
  }, [group]);
};

export const groupAppointments: PureComputed<
  [AppointmentMoment[], ValidResource[] | undefined,
  Group[][] | undefined], AppointmentMoment[][]
> = (appointments, resources, groups) => {
  if (!resources || !groups) return [appointments.slice()];
  const mainResource = resources.find(resource => resource.isMain);
  return groups![groups!.length - 1].map((group, index) => {
    const currentGroup = getCurrentGroup(groups, resources, index, group);

    return appointments.reduce((acc, appointment) => {
      const belongsToGroup = currentGroup.reduce((isBelonging, groupItem) => (
        isBelonging && groupItem.id === appointment[groupItem.fieldName]
      ), true);
      if (!belongsToGroup) return acc;
      const currentMainResourceId = currentGroup.find(
        groupItem => groupItem.fieldName === mainResource!.fieldName,
      )!.id;

      const updatedAppointment = {
        ...appointment,
        dataItem: {
          ...appointment.dataItem,
          [mainResource!.fieldName]: rearrangeResourceIds(
            mainResource!, appointment, currentMainResourceId,
          ),
        },
        resources: appointment.resources && rearrangeResources(
          mainResource!, appointment, currentMainResourceId,
        ),
      };
      return [...acc, updatedAppointment];
    }, [] as AppointmentMoment[]);
  });
};

const rearrangeResourceIds: PureComputed<
  [ValidResource, AppointmentMoment, any], any[] | any
> = (mainResource, appointment, mainResourceId) => {
  if (!mainResource.allowMultiple) {
    return mainResourceId;
  }
  return [
    mainResourceId,
    ...appointment.dataItem[mainResource!.fieldName].filter((id: any) => id !== mainResourceId),
  ];
};

export const rearrangeResources: PureComputed<
  [ValidResource, AppointmentMoment, any], ValidResourceInstance[]
> = (mainResource, appointment, currentResourceInstanceId) => {
  if (!mainResource.allowMultiple) {
    return appointment.resources;
  }
  const resources = appointment.resources.slice();
  const firstMainResource = resources.findIndex((el: ValidResourceInstance) => el.isMain);
  const currentResourceIndex = resources.findIndex(
    (el: ValidResourceInstance) => el.isMain && el.id === currentResourceInstanceId,
  );
  [resources[firstMainResource], resources[currentResourceIndex]] =
    [resources[currentResourceIndex], resources[firstMainResource]];
  return resources;
};

export const expandGroupedAppointment: PureComputed<
  [AppointmentMoment, Grouping[], ValidResource[]], AppointmentMoment[]
> = (appointment, grouping, resources) => {
  if (!resources || !grouping) {
    return [appointment];
  }
  return resources
    .reduce((acc: AppointmentMoment[], resource: ValidResource) => {
      const isGroupedByResource = grouping.find(
        group => group.resourceName === resource.fieldName,
      ) !== undefined;
      if (!isGroupedByResource) return acc;
      const resourceField = resource.fieldName;
      if (!resource.allowMultiple) {
        return acc.reduce((accumulatedAppointments, currentAppointment) => [
          ...accumulatedAppointments,
          { ...currentAppointment, [resourceField]: currentAppointment.dataItem[resourceField] },
        ], [] as AppointmentMoment[]);
      }
      return acc.reduce((accumulatedAppointments, currentAppointment) => [
        ...accumulatedAppointments,
        ...currentAppointment.dataItem[resourceField].map(
          (resourceValue: any) => ({ ...currentAppointment, [resourceField]: resourceValue }),
        ),
      ], [] as AppointmentMoment[]);
    }, [appointment] as AppointmentMoment[]);
};

export const getGroupingInfoFromGroups: PureComputed<
  [Group[][], number], Group[]
> = (groups, groupIndex) => {
  let previousIndex = groupIndex;
  const groupingInfo = groups.reduceRight((acc, currentGroups, currentIndex) => {
    if (currentIndex === groups.length - 1) return acc;
    const previousResourceLength = groups[currentIndex + 1].length / currentGroups.length;
    const currentGroupingInstance = currentGroups[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentGroupingInstance];
  }, [groups[groups.length - 1][groupIndex]]);
  return groupingInfo;
};
