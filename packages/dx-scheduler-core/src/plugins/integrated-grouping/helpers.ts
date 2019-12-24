import { PureComputed } from '@devexpress/dx-core';
import { ValidResourceInstance, GroupingItem, ViewCell, ValidResource, AppointmentMoment } from '../../types';

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

const getCurrentGroup: PureComputed<
  [GroupingItem[][], ValidResource[], number, GroupingItem], GroupingItem[]
> = (groupingItems, resources, index, groupingItem) => {
  let currentIndex = index;
  return groupingItems.reduceRight((groupAcc, groupingItemsRow, rowIndex) => {
    if (rowIndex === groupingItems!.length - 1) return groupAcc;
    currentIndex = Math.floor(currentIndex / resources[rowIndex + 1].instances.length);
    const currentInstance = groupingItemsRow[currentIndex];
    return [
      ...groupAcc,
      currentInstance,
    ];
  }, [groupingItem]);
};

export const groupAppointments: PureComputed<
  [AppointmentMoment[], ValidResource[] | undefined,
  GroupingItem[][] | undefined], AppointmentMoment[][]
> = (appointments, resources, groupingItems) => {
  if (!resources || !groupingItems) return [appointments.slice()];
  const mainResource = resources.find(resource => resource.isMain);
  return groupingItems![groupingItems!.length - 1].map((groupingItem, index) => {
    const currentGroup = getCurrentGroup(groupingItems, resources, index, groupingItem);

    return appointments.reduce((acc, appointment) => {
      const belongsToGroup = currentGroup.reduce((isBelonging, groupItem) => (
        isBelonging && groupItem.id === appointment[groupItem.fieldName]
      ), true);
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
      };
      return belongsToGroup ? [...acc, updatedAppointment] : acc;
    }, [] as AppointmentMoment[]);
  });
};

const rearrangeResourceIds: PureComputed<
  [ValidResource, AppointmentMoment, any], any[] | any
> = (mainResource, appointment, mainResourceId) => {
  if (!mainResource.allowMultiple) return mainResourceId;
  return [
    mainResourceId,
    ...appointment.dataItem[mainResource!.fieldName].filter((id: any) => id !== mainResourceId),
  ];
};
