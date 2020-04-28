import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import {
  ViewCell, CellElementsMeta, GroupOrientation,
  CalculateRectByDateAndGroupIntervalsFn, AppointmentMoment,
  AppointmentUnwrappedGroup, ViewMetaData, ElementRect, AppointmentGroup,
} from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION, HORIZONTAL_TYPE, VERTICAL_TYPE } from '../../constants';
import { toPercentage } from '../../utils';
import moment from 'moment';

const MAX_WIDTH = 1;
const INDIRECT_CHILD_LEFT_OFFSET = 0.05;

export const isAllDayElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta, GroupOrientation, number], boolean
> = (viewCellsData, allDayElementsMeta, groupOrientation, groupCount) => {
  const numberOfRows = groupOrientation === HORIZONTAL_GROUP_ORIENTATION ? 1 : groupCount;
  return isElementsMetaActual(viewCellsData, allDayElementsMeta, numberOfRows);
};

export const isTimeTableElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta], boolean
> = (viewCellsData, timeTableElementsMeta) => isElementsMetaActual(
  viewCellsData, timeTableElementsMeta, viewCellsData.length,
);

const isElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta, number], boolean
> = (viewCellsData, elementsMeta, numberOfRows) => {
  if (!elementsMeta?.getCellRects) {
    return false;
  }

  const tableSize = numberOfRows * viewCellsData[0].length;
  return tableSize === elementsMeta.getCellRects.length;
};

const appointmentHeightType = (appointment: AppointmentMoment, cellDuration: number) => {
  const durationRatio = appointment.end.clone().diff(appointment.start, 'minutes') / cellDuration;
  if (durationRatio === 1) return 'middle';
  if (durationRatio > 1) return 'long';
  return 'short';
};

const horizontalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, ViewMetaData, any], ElementRect
> = (
  appointment,
  viewMetaData,
  {
    rectByDates: getRectByAppointment,
    multiline,
    rectByDatesMeta: {
      cellElementsMeta,
      viewCellsData,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = getRectByAppointment(
    appointment,
    viewMetaData,
    {
      multiline,
      cellElementsMeta,
      viewCellsData,
    },
  );

  return {
    resources: appointment.resources,
    top: top + ((height / appointment.reduceValue) * appointment.offset),
    height: height / appointment.reduceValue,
    left: toPercentage(left, parentWidth),
    width: toPercentage(width, parentWidth),
    dataItem: appointment.dataItem,
    fromPrev: appointment.fromPrev,
    toNext: appointment.toNext,
    type: HORIZONTAL_TYPE,
  };
};

const verticalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, ViewMetaData, any], ElementRect
> = (
  appointment,
  viewMetaData,
  {
    rectByDates: getRectByAppointment,
    multiline,
    rectByDatesMeta: {
      viewCellsData,
      cellDuration,
      cellElementsMeta,
      excludedDays,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = getRectByAppointment(
    appointment,
    viewMetaData,
    {
      multiline,
      viewCellsData,
      cellDuration,
      excludedDays,
      cellElementsMeta,
    },
  );

  const { offset, width: relativeWidth, left: relativeLeft  } = appointment;
  const widthMultiplier = (relativeWidth! * 5 / 3 + relativeLeft!) <= 1 ? 5 / 3 : 1;
  const validWidth = widthMultiplier === 5 / 3
    ? widthMultiplier * relativeWidth! : relativeWidth! + 0.02;

  return {
    resources: appointment.resources,
    top,
    height,
    left: toPercentage(left + relativeLeft! * width, parentWidth),
    width: toPercentage(validWidth! * width, parentWidth),
    dataItem: appointment.dataItem,
    fromPrev: appointment.fromPrev,
    toNext: appointment.toNext,
    durationType: appointmentHeightType(appointment, cellDuration),
    type: VERTICAL_TYPE,
    offset,
  };
};

const oldVerticalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, ViewMetaData, any], ElementRect
> = (
  appointment,
  viewMetaData,
  {
    rectByDates: getRectByAppointment,
    multiline,
    rectByDatesMeta: {
      viewCellsData,
      cellDuration,
      cellElementsMeta,
      excludedDays,
      placeAppointmentsNextToEachOther,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = getRectByAppointment(
    appointment,
    viewMetaData,
    {
      multiline,
      viewCellsData,
      cellDuration,
      excludedDays,
      cellElementsMeta,
      placeAppointmentsNextToEachOther,
    },
  );

  const widthInPx = width / appointment.reduceValue;

  return {
    resources: appointment.resources,
    top,
    height,
    left: toPercentage(left + (widthInPx * appointment.offset), parentWidth),
    width: toPercentage(widthInPx, parentWidth),
    dataItem: appointment.dataItem,
    fromPrev: appointment.fromPrev,
    toNext: appointment.toNext,
    durationType: appointmentHeightType(appointment, cellDuration),
    type: VERTICAL_TYPE,
  };
};

const compareByDay: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.start.isBefore(second.start, 'day')) return -1;
  if (first.start.isAfter(second.start, 'day')) return 1;
  return 0;
};

const compareByAllDay: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.allDay && !second.allDay) return -1;
  if (!first.allDay && second.allDay) return 1;
  return 0;
};

const compareByTime: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.start.isBefore(second.start)) return -1;
  if (first.start.isAfter(second.start)) return 1;
  if (first.end.isBefore(second.end)) return 1;
  if (first.end.isAfter(second.end)) return -1;
  return 0;
};

export const sortAppointments: PureComputed<
  [AppointmentMoment[]], AppointmentMoment[]
> = appointments => appointments
  .slice().sort((a, b) => compareByDay(a, b) || compareByAllDay(a, b) || compareByTime(a, b));

const byDayPredicate: PureComputed<
  [moment.Moment, moment.Moment], boolean
> = (boundary, date) => (
  boundary.isSameOrAfter(date, 'day')
  && !boundary.isSame(boundary.clone().startOf('day'))
);

export const findOverlappedAppointments: CustomFunction<
  [AppointmentMoment[], boolean], any[]
> = (sortedAppointments, byDay = false) => {
  const appointments = sortedAppointments.slice();
  const groups: AppointmentMoment[][] = [];
  let totalIndex = 0;

  while (totalIndex < appointments.length) {
    groups.push([]);
    const current = appointments[totalIndex];
    const currentGroup = groups[groups.length - 1];
    let next = appointments[totalIndex + 1];
    let maxBoundary = current.end;

    currentGroup.push(current);
    totalIndex += 1;
    while (next && (maxBoundary.isAfter(next.start)
      || (byDay && byDayPredicate(maxBoundary, next.start)))) {
      currentGroup.push(next);
      if (maxBoundary.isBefore(next.end)) maxBoundary = next.end;
      totalIndex += 1;
      next = appointments[totalIndex];
    }
  }
  return groups;
};

const isMidnight: PureComputed<
  [moment.Moment], boolean
> = date => date.isSame(date.clone().startOf('day'));

const maxBoundaryPredicate: PureComputed<
  [moment.Moment, Date], boolean
> = (maxBoundary, startDate) => ((maxBoundary.isBefore(startDate as Date, 'day'))
  || (isMidnight(maxBoundary) && maxBoundary.isSame(startDate as Date, 'day')));

export const adjustAppointments: CustomFunction<
  [any[], boolean], any
> = (groups, byDay = false) => groups.map((items) => {
  let offset = 0;
  let reduceValue = 1;
  const appointments = items.map((appointment: any) => ({ ...appointment }));
  const groupLength = appointments.length;
  for (let startIndex = 0; startIndex < groupLength; startIndex += 1) {
    const appointment = appointments[startIndex];
    if (appointment.offset === undefined) {
      let maxBoundary = appointment.end;
      appointment.offset = offset;
      for (let index = startIndex + 1; index < groupLength; index += 1) {
        if (appointments[index].offset === undefined) {
          if ((!byDay && maxBoundary.isSameOrBefore(appointments[index].start))
            || (byDay && maxBoundaryPredicate(maxBoundary, appointments[index].start))) {
            maxBoundary = appointments[index].end;
            appointments[index].offset = offset;
          }
        }
      }

      offset += 1;
      if (reduceValue < offset) reduceValue = offset;
    }
  }
  return { items: appointments, reduceValue };
});

export const unwrapGroups: PureComputed<
  [AppointmentGroup[]], AppointmentUnwrappedGroup[]
> = groups => groups.reduce((acc, { items, reduceValue }) => {
  acc.push(...items.map(({ start, end, dataItem, offset, resources, ...restProps }) => ({
    start, end, dataItem, offset, reduceValue, resources,
    fromPrev: moment(start).diff(dataItem.startDate, 'minutes') > 1,
    toNext: moment(dataItem.endDate).diff(end, 'minutes') > 1,
    ...restProps,
  })));
  return acc;
}, [] as AppointmentUnwrappedGroup[]);

export const intervalIncludes: PureComputed<
  [moment.Moment, moment.Moment, moment.Moment], boolean
> = (intervalStart, intervalEnd, date) => date.isSameOrAfter(intervalStart)
  && date.isBefore(intervalEnd);

export const createAppointmentForest: PureComputed<
  [any[], number], any
> = (appointmentGroups, cellDuration) => appointmentGroups.map((appointmentGroup) => {
  const { items } = appointmentGroup;
  let nextItems;
  let roots;
  if (items.length === 1) {
    nextItems = [{
      ...items[0], children: [], treeDepth: 0, isDirectChild: false, hasDirectChild: false,
    }];
    roots = [0];
  } else {
    const {
      appointments, roots: appointmentTreeRoots,
    } = iterateTreeRoots(items, cellDuration);
    nextItems = appointments;
    roots = appointmentTreeRoots;
  }
  return {
    ...appointmentGroup,
    items: nextItems,
    roots,
  };
});

const iterateTreeRoots: PureComputed<
  [any[], number], any
> = (appointmentItems, cellDuration) => {
  const appointments = appointmentItems.map(props => ({ ...props }));
  const roots = [];
  let baseAppointmentId = 0;
  while (baseAppointmentId < appointments.length) {
    const appointment = appointments[baseAppointmentId];
    const { offset: appointmentOffset } = appointment;
    if (appointmentOffset === 0) {
      roots.push(baseAppointmentId);
      if (baseAppointmentId + 1 === appointments.length) {
        appointment.children = [];
        appointment.hasDirectChild = false;
        appointment.treeDepth = 0;
      } else {
        appointment.treeDepth = visitAllChildren(appointments, baseAppointmentId, cellDuration, 0);
      }
      appointment.parent = undefined;
      appointment.isDirectChild = false;
    }
    baseAppointmentId += 1;
  }
  return { appointments, roots };
};

const visitChild: PureComputed<
  [any[], number, number, number, boolean, number], any
> = (appointments, index, parentAppointmentIndex, cellDuration, isDirectChild, treeDepth) => {
  const appointment = appointments[index];
  appointment.isDirectChild = isDirectChild;
  appointment.parent = parentAppointmentIndex;
  const nextTreeDepth = treeDepth + 1;

  if (index === appointments.length - 1
    || appointment.end.isSameOrBefore(appointments[index + 1].start)) {
    appointment.children = [];
    appointment.treeDepth = 0;
    appointment.hasDirectChild = false;
    return nextTreeDepth;
  }

  const calculatedTreeDepth = visitAllChildren(
    appointments, index, cellDuration, treeDepth,
  );

  appointment.treeDepth = calculatedTreeDepth;
  return calculatedTreeDepth + 1;
};

const visitAllChildren: PureComputed<
  [any[], number, number, number], any
> = (appointments, appointmentIndex, cellDuration, treeDepth) => {
  const appointment = appointments[appointmentIndex];
  const { offset: appointmentOffset, end } = appointment;

  let maxAppointmentTreeDepth = 0;

  const children = [];

  let nextChildIndex = appointmentIndex + 1;
  while (nextChildIndex < appointments.length
    && appointments[nextChildIndex].offset !== appointmentOffset
    && appointments[nextChildIndex].start.isBefore(end)) {
    const nextAppointment = appointments[nextChildIndex];
    const { offset: nextOffset } = nextAppointment;

    if (nextOffset === appointmentOffset + 1) {
      const isDirectChild = intervalIncludes(
        appointment.start, moment(appointment.start).add(cellDuration, 'minutes'),
        appointments[nextChildIndex].start,
      );
      const nextTreeDepth = visitChild(
        appointments, nextChildIndex, appointmentIndex, cellDuration, isDirectChild, treeDepth,
      );
      if (maxAppointmentTreeDepth < nextTreeDepth) {
        maxAppointmentTreeDepth = nextTreeDepth;
      }
      children.push(nextChildIndex);
    }
    nextChildIndex += 1;
  }
  appointment.hasDirectChild = children.length !== 0 && appointments[children[0]].isDirectChild;
  appointment.children = children;

  return maxAppointmentTreeDepth;
};

export const findMaxReduceValue: PureComputed<
  [any[]], number
> = appointmentGroups => appointmentGroups.reduce((maxReduceValue, group) => {
  const currentReduceValue = group.reduceValue;
  return maxReduceValue > currentReduceValue ? maxReduceValue : currentReduceValue;
}, 1);

export const calculateAppointmentsMetaData: PureComputed<
  [any[], number], any[]
> = (appointmentGroups, indirectChildLeftOffset) => appointmentGroups.map((appointmentGroup) => {
  const { items, roots } = appointmentGroup;
  return {
    ...appointmentGroup,
    items: items.length === 1
      ? [{ ...items[0], left: 0, width: 1 }]
      : calculateRootsMetaData(items, roots, indirectChildLeftOffset),
  };
});

const calculateRootsMetaData: PureComputed<
  [any[], any[], number], any[]
> = (appointmentItems, roots, indirectChildLeftOffset) => {
  const appointments = appointmentItems.slice();
  roots.forEach((appointmentIndex) => {
    const appointment = appointments[appointmentIndex];
    const { left, width } = calculateAppointmentLeftAndWidth(
      appointments, appointment, MAX_WIDTH, indirectChildLeftOffset,
    );
    appointment.left = left;
    appointment.width = width;
    calculateChildrenMetaData(appointments, appointment, MAX_WIDTH, indirectChildLeftOffset);

  });
  return appointments;
};

const calculateChildMetaData: PureComputed<
  [any[], any, number, number], any
> = (appointments, appointmentIndex, maxWidth, indirectChildLeftOffset) => {
  const appointment = appointments[appointmentIndex];
  const { left, width } = calculateAppointmentLeftAndWidth(
    appointments, appointment, maxWidth, indirectChildLeftOffset,
  );
  appointment.left = left;
  appointment.width = width;

  if (appointment.children.length === 0) {
    return appointment;
  }

  return calculateChildrenMetaData(
    appointments, appointment, maxWidth, indirectChildLeftOffset,
  );
};

const calculateChildrenMetaData: PureComputed<
  [any[], any, number, number], any
> = (appointments, appointment, maxWidth, indirectChildLeftOffset) => {
  appointment.children.forEach((childIndex) => {
    calculateChildMetaData(appointments, childIndex, maxWidth, indirectChildLeftOffset);
  });

  return appointment;
};

export const calculateAppointmentLeftAndWidth: PureComputed<
  [any[], any, number, number], any
> = (appointments, appointment, maxWidth, indirectChildLeftOffset) => {
  const {
    hasDirectChild, treeDepth, isDirectChild, parent: parentIndex,
  } = appointment;
  if (parentIndex === undefined) {
    return ({
      width: hasDirectChild ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const parentAppointment = appointments[parentIndex];
  const {
    width: parentWidth,
    left: parentLeft,
  } = parentAppointment;
  const left = isDirectChild
    ? parentLeft + parentWidth : parentLeft + indirectChildLeftOffset;
  const unoccupiedSpace = maxWidth - left;

  return ({
    width: hasDirectChild ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

export const prepareToGroupIntoBlocks: PureComputed<
  [any[]], any[][]
> = appointments => appointments.map((appointmentForest) => {
  const { items } = appointmentForest;
  if (items.length === 1) {
    items[0].overlappingSubTreeRoots = [];
  } else {
    items.forEach((appointment, index) => {
      if (index === 0) {
        appointment.overlappingSubTreeRoots = [];
        return;
      }
      const overlappingSubTreeRoots = [] as any[];
      const { offset: appointmentOffset, end } = appointment;

      let nextChildIndex = index + 1;
      let currentBlockEnd;
      while (nextChildIndex < items.length
        && items[nextChildIndex].offset !== appointmentOffset
        && items[nextChildIndex].start.isBefore(end)) {
        const nextAppointment = items[nextChildIndex];
        if (nextAppointment.offset < appointmentOffset && nextAppointment.maxOffset === undefined) {
          nextAppointment.maxOffset = appointmentOffset ;
        }
        if (isOverlappingSubTreeRoot(
          items, appointment, nextAppointment,
          overlappingSubTreeRoots.length > 0
            ? overlappingSubTreeRoots[overlappingSubTreeRoots.length - 1]
            : undefined,
          currentBlockEnd,
        )) {
          overlappingSubTreeRoots.push(nextChildIndex);
          nextAppointment.overlappingSubTreeRoot = true;
          const maxChildDate = findChildrenMaxEndDate(items, nextAppointment, end, nextChildIndex);
          if (!currentBlockEnd || currentBlockEnd.isBefore(maxChildDate)) {
            currentBlockEnd = maxChildDate;
          }
        }
        nextChildIndex += 1;
      }
      appointment.overlappingSubTreeRoots = overlappingSubTreeRoots;
    });
  }
  return appointmentForest;
});

const isOverlappingSubTreeRoot: PureComputed<
  [any[], any, any, any | undefined, moment.Moment | undefined], boolean
> = (appointments, appointment, nextAppointment, previousSubTreeRoot, previousEndDate) => {
  const {
    offset: nextOffset, start: nextStart, overlappingSubTreeRoot, maxOffset,
  } = nextAppointment;

  const { offset, parent: parentIndex } = appointment;
  const parent = appointments[parentIndex];
  return (
    nextOffset < offset
      && (
        parent.offset === nextOffset
        || (!overlappingSubTreeRoot && (maxOffset === undefined || maxOffset >= offset))
      )
      && (!previousSubTreeRoot
        || (previousSubTreeRoot.offset >= nextOffset
        && nextStart.isSameOrAfter(previousEndDate)))
  );
};

const findChildrenMaxEndDate: PureComputed<
  [any[], any, moment.Moment, number], moment.Moment
> = (appointments, appointment, blockEndDate, blockIndex) => {
  const { children, end } = appointment;

  const maxDate = children.reduce((currentMaxDate, childIndex) => {
    const child = appointments[childIndex];
    const maxChildrenDate = findChildrenMaxEndDate(appointments, child, blockEndDate, blockIndex);
    if (maxChildrenDate.isAfter(currentMaxDate)) {
      return maxChildrenDate;
    }
    return currentMaxDate;
  }, end);
  return maxDate;
};

const calculateBlockSizeByEndDate: PureComputed<
  [any[], any, moment.Moment], number
> = (appointments, subTreeRoot, blockEndDate) => {
  const { start, children } = subTreeRoot;
  if (children.length === 0) {
    if (blockEndDate.isAfter(start)) {
      return 1;
    }
    return 0;
  }
  const maxSize = Math.max(
    ...children.map(childIndex => calculateBlockSizeByEndDate(
      appointments, appointments[childIndex], blockEndDate),
    ),
  );
  if (blockEndDate.isAfter(start)) {
    return maxSize + 1;
  }
  if (maxSize === 0) {
    return 0;
  }
  return maxSize + 1;
};

export const groupAppointmentsIntoBlocks: PureComputed<
  [any[]], any[][]
> = appointments => appointments.map((appointmentForest) => {
  const { items, reduceValue } = appointmentForest;
  const result = items.reduce((blocks, appointment, index) => {
    const {
      offset, start, end, treeDepth,
      overlappingSubTreeRoots, overlappingSubTreeRoot,
    } = appointment;
    if (overlappingSubTreeRoots.length !== 0) {
      if (!overlappingSubTreeRoot) {
        blocks.push({
          start, end, minOffset: offset, maxOffset: offset + treeDepth,
          size: treeDepth + 1, items: [], endForChildren: end,
        });
      }
      overlappingSubTreeRoots.forEach((subTreeRootIndex) => {
        const subTreeRoot = items[subTreeRootIndex];
        blocks.push({
          start: subTreeRoot.start, end, minOffset: subTreeRoot.offset, maxOffset: offset - 1,
          size: calculateBlockSizeByEndDate(items, subTreeRoot, end), items: [],
          endForChildren: subTreeRoot.end,
        });
      });
    }
    if (!appointment.blockIndex) {
      let blockIndex = blocks.length - 1;
      while (blockIndex > 0) {
        const currentBlock = blocks[blockIndex];
        if (intervalIncludes(currentBlock.start, currentBlock.end, start)
          && offset >= currentBlock.minOffset && offset <= currentBlock.maxOffset
        ) {
          break;
        }
        blockIndex -= 1;
      }
      blocks[blockIndex].items.push(index);
      appointment.blockIndex = blockIndex;
    }
    return blocks;
  }, [{
    start: items[0].start,
    end: items[0].end,
    minOffset: 0,
    maxOffset: reduceValue - 1,
    size: reduceValue - 1,
    items: [],
  }]);
  return result;
});

export const findChildBlocks: PureComputed<
  [any[][]], any[][]
> = (groupedIntoBlocks) => {
  return groupedIntoBlocks.map((blocks) => {
    const result = blocks.map((block, index) => {
      const { start, endForChildren, minOffset, includedInto } = block;
      block.children = [];
      for (let currentIndex = index + 1; currentIndex < blocks.length; currentIndex += 1) {
        const currentBlock = blocks[currentIndex];
        const {
          start: currentStart, maxOffset: currentMaxOffset,
          includedInto: currentIncludedInto,
        } = currentBlock;

        if (intervalIncludes(start, endForChildren, currentStart)
          && currentMaxOffset + 1 === minOffset
          && (
            currentIncludedInto === undefined
            || currentIncludedInto === includedInto
          )) {
          block.children.push(currentIndex);
          currentBlock.parent = index;
        }
      }
      return block;
    });
    return result;
  });
};

export const findIncludedBlocks: PureComputed<
  [any[][]], any[][]
> = (groupedIntoBlocks) => {
  return groupedIntoBlocks.map((blocks) => {
    const result = blocks.map((block, blockIndex) => {
      const { start, end, minOffset, maxOffset } = block;
      block.includedBlocks = [];
      for (let currentBlockIndex = blockIndex + 1; currentBlockIndex < blocks.length; currentBlockIndex += 1) {
        const currentBlock = blocks[currentBlockIndex];
        const {
          start: currentStart, end: currentEnd,
          maxOffset: currentMaxOffset, minOffset: currentMinOffset,
        } = currentBlock;
        if (intervalIncludes(start, end, currentStart) /* && intervalIncludes(start, end, currentEnd) */
          && currentMaxOffset <= maxOffset && currentMinOffset >= minOffset) {
          block.includedBlocks.push(currentBlockIndex);
          currentBlock.includedInto = blockIndex;
        }
      }
      return block;
    });
    return result;
  });
};

export const updateAppointmentLeftAndWidth: PureComputed<
  [any[], any[],  any, number, number], any
> = (appointments, blocks,  appointment, maxWidth, indirectChildLeftOffset) => {
  const {
    hasDirectChild, treeDepth, isDirectChild, parent: parentAppointmentIndex, children, blockIndex,
  } = appointment;
  const parentAppointment = appointments[parentAppointmentIndex];
  const firstChild = appointments[children[0]];
  const firstChildBlockIndex = firstChild?.blockIndex;

  const hasDirectChildAndInSameBlock = hasDirectChild
    && (firstChildBlockIndex === undefined || (blockIndex === firstChildBlockIndex
      || blocks[firstChildBlockIndex].includedInto === blockIndex
      || maxWidth === 1));

  if (parentAppointment === undefined) {
    return ({
      width: hasDirectChildAndInSameBlock ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const {
    width: parentWidth,
    left: parentLeft,
  } = parentAppointment;
  const left = isDirectChild
    ? parentLeft + parentWidth : parentLeft + indirectChildLeftOffset;
  const unoccupiedSpace = maxWidth - left;

  return ({
    width: hasDirectChildAndInSameBlock ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

const updateAppointmentWidth: PureComputed<
  [any[], any[], any, number, number], any
> = (appointments, blocks,  appointment, maxWidth, defaultLeft) => {
  const {
    hasDirectChild, treeDepth, parent: parentAppointmentIndex, blockIndex, children,
  } = appointment;

  const firstChild = appointments[children[0]];
  const firstChildBlockIndex = firstChild?.blockIndex;

  const hasDirectChildAndInSameBlock = hasDirectChild
    && (firstChildBlockIndex === undefined || (blockIndex === firstChildBlockIndex)
      || blocks[firstChildBlockIndex].includedInto === blockIndex
      || maxWidth === 1);

  if (parentAppointmentIndex === undefined) {
    return ({
      width: hasDirectChildAndInSameBlock ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const left = defaultLeft;
  const unoccupiedSpace = maxWidth - left;

  return ({
    width: hasDirectChildAndInSameBlock ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

export const adjustByBlocks: PureComputed<
  [any[], any[], number], any[]
> = (appointmentGroups, groupedIntoBlocks, indirectChildLeftOffset) => {
  const updatedBlocks = groupedIntoBlocks.map((blocks, index) => {
    const result = updateBlocksTotalSize(calculateBlocksLeft(
      calculateBlocksTotalSize(blocks), appointmentGroups[index].items,
    ));
    result.forEach((block) => {
      block.right = undefined;
    });
    return updateBlocksTotalSize(calculateBlocksLeft(
      updateBlocksLeft(result, appointmentGroups[index].items), appointmentGroups[index].items,
    ));
  });
  const adjustedBlocks = updatedBlocks.map((blocks, index) => {
    return adjustAppointmentsByBlocks(appointmentGroups[index].items, blocks, indirectChildLeftOffset);
  });
  return adjustedBlocks;
};

const adjustAppointmentsByBlocks: PureComputed<
  [any[], any[], number], any[]
> = (appointments, blocks, indirectChildLeftOffset) => {
  const result = blocks.map((block, index) => {
    if (index === 0) {
      return block;
    }
    const { items, left: blockLeft, right } = block;

    items.forEach((appointmentIndex, index) => {
      const appointment = appointments[appointmentIndex];
      if (index === 0) {
        const { left, width } = updateAppointmentWidth(
          appointments, blocks, appointment, right, blockLeft,
        );
        appointment.left = left;
        appointment.width = width;
      } else {
        const {
          left, width,
        } = updateAppointmentLeftAndWidth(
          appointments, blocks, appointment, right, indirectChildLeftOffset,
        );
        appointment.left = left;
        appointment.width = width;
      }
    });

    return block;
  });
  blocks[0].items.forEach((appointmentIndex) => {
    const appointment = appointments[appointmentIndex];
    const {
      left, width,
    } = updateAppointmentLeftAndWidth(appointments, blocks, appointment, 1, indirectChildLeftOffset);
    appointment.left = left;
    appointment.width = width;
  });
  return result;
};

const calculateBlocksTotalSize: PureComputed<
  [any[]], any[]
> = (blocks) => {
  const result = blocks.map((block, index) => {
    const totalSize = calculateSingleBlockTotalSize(blocks, block);
    block.totalSize = totalSize;
    block.leftOffset = totalSize - block.size;
    return block;
  });
  return result;
};

const calculateSingleBlockTotalSize: PureComputed<
  [any[], any], number
> = (blocks, block) => {
  const { children, size } = block;
  if (children.length === 0) {
    return size;
  }
  return Math.max(
    ...children.map(childIndex => calculateSingleBlockTotalSize(blocks, blocks[childIndex])),
  ) + size;
};

const updateBlocksTotalSize: PureComputed<
  [any[]], any[]
> = (blocks) => {
  blocks.map((block, index) => {
    const { right, totalSize } = block;
    if (right) {
      return block;
    }
    // block.left = (1 - totalLeft) * leftOffset / totalSize + totalLeft;
    updateSingleBlockTotalSize(blocks, block, totalSize, 1);
    return block;
  });
  return blocks;
};

const updateSingleBlockTotalSize: PureComputed<
  [any[], any, number, number], void
> = (blocks, block, totalSize, right) => {
  const { children, totalLeft, leftOffset } = block;
  block.totalSize = totalSize;
  block.right = right;
  block.left = (1 - totalLeft) * leftOffset / totalSize + totalLeft;
  children.map(childIndex => updateSingleBlockTotalSize(
    blocks, blocks[childIndex], totalSize, block.left));
};

const updateBlocksLeft: PureComputed<
  [any[], any[]], any[]
> = (blocks, appointments) => {
  blocks.map((block, index) => {
    const { items, left } = block;
    const firstItem = appointments[items[0]];
    const { parent: firstItemParentIndex, blockIndex } = firstItem;
    const firstItemParent = appointments[firstItemParentIndex];
    if (!firstItemParent || blockIndex === firstItemParent.blockIndex) {
      return block;
    }
    const parentBlock = blocks[firstItemParent.blockIndex];

    block.left = parentBlock.parent === undefined ? left : blocks[parentBlock.parent].left;
    return block;
  });
  return blocks;
};

const calculateBlocksLeft: PureComputed<
  [any[], any[]], any[]
> = (blocks, appointments) => {
  const result = blocks.map((block, index) => {
    const totalLeft = calculateSingleBlockLeft(blocks, appointments, block);
    block.totalLeft = totalLeft;
    return block;
  });
  return result;
};

const calculateSingleBlockLeft: PureComputed<
  [any[], any[], any], number
> = (blocks, appointments, block) => {
  const { children, items, left } = block;
  if (children.length === 0) {
    return !!left ? Math.min(left, appointments[items[0]].left) : appointments[items[0]].left;
  }
  return Math.min(
    ...children.map(childIndex => calculateSingleBlockLeft(
      blocks, appointments, blocks[childIndex],
    )),
  );
};

export const calculateTreeDepthByBlocks: PureComputed<
  [any, any[]], any
> = (appointmentForests, blockGroups) => appointmentForests.map((appointmentForest, index) => {
  const blocks = blockGroups[index];
  const { roots, items } = appointmentForest;
  const appointments = items.slice();
  roots.forEach((rootIndex) => {
    const root = appointments[rootIndex];
    calculateSubTreeDepth(appointments, blocks, root);
  });

  return {
    ...appointmentForest,
    items: appointments,
  };
});

const calculateSubTreeDepth: PureComputed<
  [any[], any[], any], number
> = (appointments, blocks, subTreeRoot) => {
  const { parent: parentIndex, children, blockIndex } = subTreeRoot;
  const maxChildrenDepth = children.reduce((acc, childIndex) => {
    const child = appointments[childIndex];
    return Math.max(acc, calculateSubTreeDepth(appointments, blocks, child));
  }, 0);

  subTreeRoot.treeDepth = maxChildrenDepth;
  const parent = parentIndex !== undefined ? appointments[parentIndex] : undefined;
  const parentBlockIndex = parent?.blockIndex;
  const subTreeBlock = blocks[blockIndex];
  if (blockIndex === parentBlockIndex || subTreeBlock.includedInto === parentBlockIndex || !parent) {
    return maxChildrenDepth + 1;
  }
  return 0;
};

export const calculateRectByDateAndGroupIntervals: CalculateRectByDateAndGroupIntervalsFn = (
  type, intervals, rectByDates, rectByDatesMeta, viewMetaData,
) => {
  const { growDirection, multiline } = type;
  const isHorizontal = growDirection === HORIZONTAL_TYPE;

  const sorted = intervals.map(sortAppointments);
  const grouped = sorted.reduce(((acc, sortedGroup) => [
    ...acc,
    ...findOverlappedAppointments(sortedGroup as AppointmentMoment[], isHorizontal),
  ]), [] as AppointmentMoment[]);

  const { cellDuration, placeAppointmentsNextToEachOther } = rectByDatesMeta;
  const rectCalculator = isHorizontal
    ? horizontalRectCalculator
    : placeAppointmentsNextToEachOther ? oldVerticalRectCalculator : verticalRectCalculator;

  const adjusted = adjustAppointments(grouped as any[], isHorizontal);
  const appointmentForest = createAppointmentForest(adjusted, cellDuration);
  const indirectChildLeftOffset = Math.min(
    1 / findMaxReduceValue(appointmentForest),
    INDIRECT_CHILD_LEFT_OFFSET,
  );
  const adjusted1 = calculateAppointmentsMetaData(appointmentForest, indirectChildLeftOffset);
  const preparedToGroupIntoBlocks = prepareToGroupIntoBlocks(adjusted1);
  const groupedIntoBlocks = groupAppointmentsIntoBlocks(preparedToGroupIntoBlocks);
  const blocksWithIncluded = findIncludedBlocks(groupedIntoBlocks);
  const blocksWithParents = findChildBlocks(blocksWithIncluded);
  console.log(blocksWithParents)
  const depthRecalculated = calculateTreeDepthByBlocks(preparedToGroupIntoBlocks, blocksWithParents);
  const adjustedBlocks = adjustByBlocks(depthRecalculated, blocksWithParents, indirectChildLeftOffset);
  console.log(depthRecalculated)
  const rects =  unwrapGroups(depthRecalculated)
    .map(appointment => rectCalculator(
      appointment, viewMetaData,
      { rectByDates, multiline, rectByDatesMeta },
    ));
  return rects.sort((first, second) => first.offset! >= second.offset! ? 1 : -1);
};
