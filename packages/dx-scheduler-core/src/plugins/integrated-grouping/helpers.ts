import { PureComputed } from '@devexpress/dx-core';
import {
  ValidResourceInstance, Group, ViewCell,
  ValidResource, AppointmentMoment, Grouping,
} from '../../types';

export const getGroupFromResourceInstance: PureComputed<
  [ValidResourceInstance], Group
> = resourceInstance => ({
  id: resourceInstance.id,
  fieldName: resourceInstance.fieldName,
  text: resourceInstance.text,
});

export const addGroupInfoToCells: PureComputed<
  [Group, Group[][],
  ValidResource[], ViewCell[], number], ViewCell[]
> = (currentGroup, groups, sortedResources, viewCellRow, index) => viewCellRow.map((
    viewCell: ViewCell, cellIndex: number,
  ) => {
  const groupedCell = addGroupInfoToCell(
    currentGroup, groups, sortedResources, viewCell, index,
  ) as ViewCell;
  return cellIndex !== viewCellRow.length - 1
    ? groupedCell : { ...groupedCell, hasRightBorder: true };
});

export const addGroupInfoToCell: PureComputed<
  [Group, Group[][],
  ValidResource[], ViewCell, number], ViewCell
> = (currentGroup, groups, sortedResources, viewCell, index) => {
  let previousIndex = index;
  const groupingInfo = groups.reduceRight((
    acc: Group[], groupingItem: Group[], currentIndex: number,
  ) => {
    if (currentIndex === groups.length - 1) return acc;
    const previousResourceLength = sortedResources[currentIndex + 1].instances.length;
    const currentGroupingInstance = groupingItem[Math.floor(
      previousIndex / previousResourceLength,
    )];
    previousIndex = currentIndex;
    return [...acc, currentGroupingInstance];
  }, [currentGroup]);
  return { ...viewCell, groupingInfo };
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
