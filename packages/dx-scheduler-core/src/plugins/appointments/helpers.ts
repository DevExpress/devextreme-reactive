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

  const { offset, width: relativeWidth, left: relativeLeft, maxWidth  } = appointment;
  let widthMultiplier = (relativeWidth! * 5 / 3 + relativeLeft!) <= 1 ? 5 / 3 : 1;
  if (widthMultiplier !== 5 / 3 && maxWidth) {
    widthMultiplier = maxWidth / relativeWidth!;
  }

  return {
    resources: appointment.resources,
    top,
    height,
    left: toPercentage(left + relativeLeft! * width, parentWidth),
    width: toPercentage(relativeWidth! * width * widthMultiplier, parentWidth),
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
    roots = [nextItems[0]];
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
      roots.push(appointment);
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
> = (appointments, index, parentAppointment, cellDuration, isDirectChild, treeDepth) => {
  const appointment = appointments[index];
  appointment.isDirectChild = isDirectChild;
  appointment.parent = parentAppointment;
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
        appointments, nextChildIndex, appointment, cellDuration, isDirectChild, treeDepth,
      );
      if (maxAppointmentTreeDepth < nextTreeDepth) {
        maxAppointmentTreeDepth = nextTreeDepth;
      }
      children.push(appointments[nextChildIndex]);
    }
    nextChildIndex += 1;
  }
  appointment.hasDirectChild = children.length !== 0 && children[0].isDirectChild;
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
  roots.forEach((appointment) => {
    const { left, width } = calculateAppointmentLeftAndWidth(
      appointment, MAX_WIDTH, indirectChildLeftOffset,
    );
    appointment.left = left;
    appointment.width = width;
    calculateChildrenMetaData(appointments, appointment, MAX_WIDTH, indirectChildLeftOffset);

  });
  return appointments;
};

const calculateChildMetaData: PureComputed<
  [any[], any, number, number], any
> = (appointments, appointment, maxWidth, indirectChildLeftOffset) => {
  const { left, width } = calculateAppointmentLeftAndWidth(
    appointment, maxWidth, indirectChildLeftOffset,
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
  appointment.children.forEach((child) => {
    calculateChildMetaData(appointments, child, maxWidth, indirectChildLeftOffset);
  });

  return appointment;
};

export const calculateAppointmentLeftAndWidth: PureComputed<
  [any, number, number], any
> = (appointment, maxWidth, indirectChildLeftOffset) => {
  const {
    hasDirectChild, treeDepth, isDirectChild, parent: parentAppointment, children,
  } = appointment;
  if (!parentAppointment) {
    return ({
      width: hasDirectChild ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const {
    width: parentWidth,
    left: parentLeft,
  } = parentAppointment;
  const left = isDirectChild
    ? parentLeft + parentWidth : parentLeft + indirectChildLeftOffset;
  const unoccupiedSpace = isDirectChild
    ? maxWidth - parentLeft - parentWidth : maxWidth - left;

  return ({
    width: hasDirectChild ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

export const prepareToGroupIntoBlocks: PureComputed<
  [any[]], any[][]
> = appointments => appointments.map((appointmentForest) => {
  const { items } = appointmentForest;
  items.forEach((item) => {
    item.blockIndexes = [];
  });
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

        if (isOverlappingSubTreeRoot(
          appointment, nextAppointment,
          overlappingSubTreeRoots.length > 0
            ? overlappingSubTreeRoots[overlappingSubTreeRoots.length - 1]
            : undefined,
          currentBlockEnd,
        )) {
          overlappingSubTreeRoots.push(nextAppointment);
          nextAppointment.overlappingSubTreeRoot = true;
          const maxChildDate = markWithBlockIndex(nextAppointment, end, nextChildIndex);
          if (!currentBlockEnd || currentBlockEnd.isBefore(maxChildDate)) {
            currentBlockEnd = maxChildDate;
          }
        }
        nextChildIndex += 1;
      }
      appointment.overlappingSubTreeRoots = overlappingSubTreeRoots;
      if (overlappingSubTreeRoots.length !== 0) {
        markWithBlockIndex(appointment, end, index);
      }
    });
  }
  return appointmentForest;
});

const isOverlappingSubTreeRoot: PureComputed<
  [any, any, any | undefined, moment.Moment | undefined], boolean
> = (appointment, nextAppointment, previousSubTreeRoot, previousEndDate) => {
  const { offset: nextOffset, start: nextStart, blockIndexes: nextBlockIndexes } = nextAppointment;
  const { offset, blockIndexes } = appointment;
  return (
    nextOffset < offset
      && compareBlockIndexes(blockIndexes, nextBlockIndexes)
      && (!previousSubTreeRoot
      || (previousSubTreeRoot.offset >= nextOffset
        && nextStart.isSameOrAfter(previousEndDate)))
  );
};

export const compareBlockIndexes: PureComputed<
  [number[], number[]], boolean
> = (firstBlockIndexes, secondBlockIndexes) => {
  return ((secondBlockIndexes.length === 0)
    || firstBlockIndexes.filter(index => secondBlockIndexes.includes(index)).length !== 0);
};

const markWithBlockIndex: PureComputed<
  [any, moment.Moment, number], moment.Moment
> = (appointment, blockEndDate, blockIndex) => {
  const { children, blockIndexes, start, end } = appointment;
  if (start.isBefore(blockEndDate)) {
    appointment.blockIndexes = [...blockIndexes, blockIndex];
  }

  const maxDate = children.reduce((currentMaxDate, child) => {
    const maxChildrenDate = markWithBlockIndex(child, blockEndDate, blockIndex);
    if (maxChildrenDate.isAfter(currentMaxDate)) {
      return maxChildrenDate;
    }
    return currentMaxDate;
  }, end);
  return maxDate;
};

const calculateBlockSizeByEndDate: PureComputed<
  [any, moment.Moment], number
> = (subTreeRoot, blockEndDate) => {
  const { start, children } = subTreeRoot;
  if (children.length === 0) {
    if (blockEndDate.isAfter(start)) {
      return 1;
    }
    return 0;
  }
  const maxSize = Math.max(
    ...children.map(child => calculateBlockSizeByEndDate(child, blockEndDate)),
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
          size: treeDepth + 1, items: [],
        });
      }
      overlappingSubTreeRoots.forEach((subTreeRoot) => {
        blocks.push({
          start: subTreeRoot.start, end, minOffset: subTreeRoot.offset, maxOffset: offset - 1,
          size: calculateBlockSizeByEndDate(subTreeRoot, end), items: [],
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
      blocks[blockIndex].items.push(appointment);
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
      const { start, end, minOffset } = block;
      block.children = [];
      for (let currentIndex = index + 1; currentIndex < blocks.length; currentIndex += 1) {
        const currentBlock = blocks[currentIndex];
        const { start: currentStart, maxOffset: currentMaxOffset } = currentBlock;
        if (intervalIncludes(start, end, currentStart) && currentMaxOffset + 1 === minOffset) {
          block.children.push(currentBlock);
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
    const result = blocks.map((block, index) => {
      const { start, end, minOffset, maxOffset } = block;
      block.includedBlocks = [];
      for (let currentIndex = index + 1; currentIndex < blocks.length; currentIndex += 1) {
        const currentBlock = blocks[currentIndex];
        const {
          start: currentStart, end: currentEnd,
          maxOffset: currentMaxOffset, minOffset: currentMinOffset,
        } = currentBlock;
        if (intervalIncludes(start, end, currentStart) /* && intervalIncludes(start, end, currentEnd) */
          && currentMaxOffset < maxOffset && currentMinOffset >= minOffset) {
          block.includedBlocks.push(currentBlock);
        }
      }
      return block;
    });
    return result;
  });
};

const updateAppointmentWidth: PureComputed<
  [any, number, number], any
> = (appointment, maxWidth, defaultLeft) => {
  const {
    hasDirectChild, treeDepth, isDirectChild, parent: parentAppointment, blockIndex, children,
  } = appointment;
  const hasDirectChildAndInSameBlock = hasDirectChild && (blockIndex === children[0].blockIndex);
  if (!parentAppointment) {
    return ({
      width: hasDirectChildAndInSameBlock ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const {
    width: parentWidth,
    left: parentLeft,
  } = parentAppointment;
  const left = defaultLeft;
  const unoccupiedSpace = isDirectChild
    ? maxWidth - parentLeft - parentWidth : maxWidth - left;

  return ({
    width: hasDirectChild ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

export const adjustByBlocks: PureComputed<
  [any[], number], any[]
> = (groupedIntoBlocks, indirectChildLeftOffset) => {
  const updatedBlocks = groupedIntoBlocks.map((blocks) => {
    const result =  calculateBlocksLeft(calculateBlocksTotalSize(blocks));
    return updateBlocksTotalSize(result);
  });
  const adjustedBlocks = updatedBlocks.map((blocks) => {
    return adjustAppointmentsByBlocks(blocks, indirectChildLeftOffset);
  });
  return adjustedBlocks;
};

const adjustAppointmentsByBlocks: PureComputed<
  [any[], number], any[]
> = (blocks, indirectChildLeftOffset) => {
  const result = blocks.map((block, index) => {
    if (index === 0) {
      return block;
    }
    const { items, left: blockLeft, right } = block;

    items.forEach((item, index) => {
      if (index === 0) {
        const { left, width } = updateAppointmentWidth(item, right, blockLeft);
        item.left = left;
        item.width = width;
      } else {
        const {
          left, width,
        } = calculateAppointmentLeftAndWidth(item, right, indirectChildLeftOffset);

        item.left = left;
        item.width = width;
      }
    });

    return block;
  });
  return result;
};

const calculateBlocksTotalSize: PureComputed<
  [any[]], any[]
> = (blocks) => {
  const result = blocks.map((block, index) => {
    const totalSize = calculateSingleBlockTotalSize(block);
    block.totalSize = totalSize;
    block.leftOffset = totalSize - block.size;
    return block;
  });
  return result;
};

const calculateSingleBlockTotalSize: PureComputed<
  [any], number
> = (block) => {
  const { children, size } = block;
  if (children.length === 0) {
    return size;
  }
  return Math.max(...children.map(child => calculateSingleBlockTotalSize(child))) + size;
};

const updateBlocksTotalSize: PureComputed<
  [any[]], void
> = (blocks) => {
  blocks.map((block, index) => {
    const { totalLeft, right, totalSize, leftOffset } = block;
    if (right) {
      return block;
    }
    // block.left = (1 - totalLeft) * leftOffset / totalSize + totalLeft;
    updateSingleBlockTotalSize(block, totalSize, 1);
    return block;
  });
  return blocks;
};

const updateSingleBlockTotalSize: PureComputed<
  [any, number, number], void
> = (block, totalSize, right) => {
  const { children, totalLeft, leftOffset } = block;
  block.totalSize = totalSize;
  block.right = right;
  block.left = (1 - totalLeft) * leftOffset / totalSize + totalLeft;
  children.map(child => updateSingleBlockTotalSize(child, totalSize, block.left));
};

const calculateBlocksLeft: PureComputed<
  [any[]], any[]
> = (blocks) => {
  const result = blocks.map((block, index) => {
    const totalLeft = calculateSingleBlockLeft(block);
    block.totalLeft = totalLeft;
    return block;
  });
  return result;
};

const calculateSingleBlockLeft: PureComputed<
  [any], number
> = (block) => {
  const { children, items } = block;
  if (children.length === 0) {
    return items[0].left;
  }
  return Math.min(...children.map(child => calculateSingleBlockLeft(child)));
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
  // console.log(appointmentForest)
  const indirectChildLeftOffset = Math.min(
    1 / findMaxReduceValue(appointmentForest),
    INDIRECT_CHILD_LEFT_OFFSET,
  );
  const adjusted1 = calculateAppointmentsMetaData(appointmentForest, indirectChildLeftOffset);
  const preparedToGroupIntoBlocks = prepareToGroupIntoBlocks(adjusted1);
  // console.log(preparedToGroupIntoBlocks)
  const groupedIntoBlocks = groupAppointmentsIntoBlocks(preparedToGroupIntoBlocks);
  console.log(groupedIntoBlocks)
  const blocksWithParents = findChildBlocks(groupedIntoBlocks);
  const blocksWithIncluded = findIncludedBlocks(blocksWithParents);
  // console.log(blocksWithIncluded)
  const adjustedBlocks = adjustByBlocks(blocksWithIncluded, indirectChildLeftOffset);
  // console.log(adjustedBlocks)
  const rects =  unwrapGroups(adjusted1)
    .map(appointment => rectCalculator(
      appointment, viewMetaData,
      { rectByDates, multiline, rectByDatesMeta },
    ));
  return rects.sort((first, second) => first.offset! >= second.offset! ? 1 : -1);
};
