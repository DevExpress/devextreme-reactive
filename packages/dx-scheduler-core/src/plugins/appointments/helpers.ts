import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import {
  ViewCell, CellElementsMeta, GroupOrientation, AppointmentMoment,
  AppointmentUnwrappedGroup, ViewMetaData, ElementRect, AppointmentGroup,
  AppointmentForestRoots, CalculatedTreeNode, TreeNodeWithOverlappingSubTreeRoots,
  TreeNodeInBlock, AppointmentBlock, IncludedBlock, BlockWithChildren, CalculatedBlock,
  GroupedIntoBlocksForest, AppointmentIndex,

  VisitRootsFn, CalculateRectByDateAndGroupIntervalsFn, CreateAppointmentForestFn,
  VisitChildFn, VisitAllChildrenFn, IsPossibleChildFn, FindMaxReduceValueFn,
  CalculateAppointmentsMetaDataFn, CalulateRootsMetaDataFn, CalculateChildMetaDataFn,
  CalculateChildrenMetaDataFn, CalculateAppointmentLeftAndWidthFn, PrepareToGroupIntoBlocksFn,
  IsOverlappingSubTreeRootFn, FindChildrenMaxEndDateFn, GroupAppointmentsIntoBlocksFn,
  CalculateBlockSizeBEndDateFn, FindBlockIndexByAppointmentFn, FindIncludedBlocksFn,
  IsIncludedBlockFn, FindChildBlocksFn, IsChildBlockFn, AdjustByBlocksFn,
  CalculateBlockDimensionsFn, AlignBlocksWithPreviousFn, AdjustAppointemntsByBlocksFn,
  RedistributeBlocksFn, CalculateIncludedBlockMaxRightFn, CalculateBlocksTotalSizeFn,
  CalculateSingleBlockTotalSizeFn, CalculateBlocksLeftLimitFn, CalculateSingleBlockLeftLimitFn,
  UpdateBlocksProportionsFn, UpdateBlocksLeftFn, CreateAndAdjustAppointmentForestFn,
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
    key: appointment.key,
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
  let validWidth = widthMultiplier === 5 / 3
    ? widthMultiplier * relativeWidth! : relativeWidth! + 0.02;
  if (validWidth + relativeLeft! > 1) {
    validWidth = 1 - relativeLeft!;
  }

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
    key: appointment.key,
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
    key: appointment.key,
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

export const calculateAppointmentOffsets: CustomFunction<
  [any[], boolean], AppointmentGroup[]
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

const unwrapAppointmentForest: PureComputed<
  [GroupedIntoBlocksForest[]], AppointmentUnwrappedGroup[]
> = (appointmentForests) => {
  const forestUnwrapped = appointmentForests.map(({ items, reduceValue }) => ({
    reduceValue,
    items: items.map(({ data }) => ({ ...data })),
  }));
  return unwrapGroups(forestUnwrapped);
};

export const unwrapGroups: PureComputed<
  [AppointmentGroup[]], AppointmentUnwrappedGroup[]
> = groups => groups.reduce((acc, { items, reduceValue }) => {
  acc.push(...items.map(({ start, end, dataItem, offset, resources, key, ...restProps }) => ({
    start, end, dataItem, offset, reduceValue, resources,
    fromPrev: moment(start).diff(dataItem.startDate, 'minutes') > 1,
    toNext: moment(dataItem.endDate).diff(end, 'minutes') > 1,
    key,
    ...restProps,
  })));
  return acc;
}, [] as AppointmentUnwrappedGroup[]);

export const intervalIncludes: PureComputed<
  [moment.Moment, moment.Moment, moment.Moment], boolean
> = (intervalStart, intervalEnd, date) => date
  .isBetween(intervalStart, intervalEnd, undefined, '[)');

export const createAppointmentForest: CreateAppointmentForestFn = (
  appointmentGroups, cellDuration,
) => appointmentGroups.map((appointmentGroup) => {
  const { items } = appointmentGroup;
  let nextItems;
  let roots;
  if (items.length === 1) {
    nextItems = [{
      data: items[0], children: [], treeDepth: 0, isDirectChild: false, hasDirectChild: false,
    }];
    roots = [0];
  } else {
    const {
      appointments, roots: appointmentTreeRoots,
    } = visitRoots(items, cellDuration) as AppointmentForestRoots;
    nextItems = appointments;
    roots = appointmentTreeRoots;
  }
  return {
    ...appointmentGroup,
    items: nextItems,
    roots,
  };
});

const visitRoots: VisitRootsFn = (appointmentItems, cellDuration) => {
  const appointmentNodes: any[] = appointmentItems.map(props => ({
    data: props,
  }));

  const roots = appointmentNodes.reduce((acc, appointment, appointmentIndex) => {
    const { offset: appointmentOffset } = appointment.data;

    if (appointmentOffset === 0) {
      if (appointmentIndex + 1 === appointmentNodes.length) {
        appointment.children = [];
        appointment.hasDirectChild = false;
        appointment.treeDepth = 0;
      } else {
        appointment.treeDepth = visitAllChildren(
          appointmentNodes, appointmentIndex, cellDuration, 0,
        );
      }

      appointment.parent = undefined;
      appointment.isDirectChild = false;
      return [...acc, appointmentIndex];
    }
    return acc;
  }, []);
  return { appointments: appointmentNodes, roots };
};

const visitChild: VisitChildFn = (
  appointmentNodes, index, parentAppointmentIndex, cellDuration, isDirectChild, treeDepth,
) => {
  const appointmentNode = appointmentNodes[index];
  appointmentNode.isDirectChild = isDirectChild;
  appointmentNode.parent = parentAppointmentIndex;
  const nextTreeDepth = treeDepth + 1;
  const { end } = appointmentNode.data;

  if (index === appointmentNodes.length - 1
    || end.isSameOrBefore(appointmentNodes[index + 1].data.start)) {
    appointmentNode.children = [];
    appointmentNode.treeDepth = 0;
    appointmentNode.hasDirectChild = false;
    return nextTreeDepth;
  }

  const calculatedTreeDepth = visitAllChildren(
    appointmentNodes, index, cellDuration, treeDepth,
  );

  appointmentNode.treeDepth = calculatedTreeDepth;
  return calculatedTreeDepth + 1;
};

const visitAllChildren: VisitAllChildrenFn = (
  appointmentNodes, appointmentIndex, cellDuration, treeDepth,
) => {
  const appointment = appointmentNodes[appointmentIndex];
  const { end, offset: appointmentOffset, start } = appointment.data;
  const directChildTimeLimit = moment(start).add(cellDuration, 'minutes');
  let maxAppointmentTreeDepth = 0;
  const children = [] as AppointmentIndex[];

  let nextChildIndex = appointmentIndex + 1;
  while (isPossibleChild(appointmentNodes, nextChildIndex, end, appointmentOffset)) {
    const nextAppointment = appointmentNodes[nextChildIndex];
    const { offset: nextOffset, start: nextStart } = nextAppointment.data;

    if (nextOffset === appointmentOffset + 1) {
      const isDirectChild = intervalIncludes(start, directChildTimeLimit, nextStart);
      const nextTreeDepth = visitChild(
        appointmentNodes, nextChildIndex, appointmentIndex, cellDuration, isDirectChild, treeDepth,
      );

      if (maxAppointmentTreeDepth < nextTreeDepth) {
        maxAppointmentTreeDepth = nextTreeDepth;
      }
      children.push(nextChildIndex);
    }
    nextChildIndex += 1;
  }
  appointment.hasDirectChild = children.length !== 0 && appointmentNodes[children[0]].isDirectChild;
  appointment.children = children;

  return maxAppointmentTreeDepth;
};

export const isPossibleChild: IsPossibleChildFn = (
  appointments, possibleChildIndex, parentEnd, parentOffset,
) => {
  const possibleChild = appointments[possibleChildIndex];
  return (
    possibleChildIndex < appointments.length
    && possibleChild.data.offset !== parentOffset
    && possibleChild.data.start.isBefore(parentEnd)
  );
};

export const findMaxReduceValue: FindMaxReduceValueFn =
  appointmentGroups => appointmentGroups.reduce((maxReduceValue, group) => {
    const currentReduceValue = group.reduceValue;
    return maxReduceValue > currentReduceValue ? maxReduceValue : currentReduceValue;
  }, 1);

export const calculateAppointmentsMetaData: CalculateAppointmentsMetaDataFn = (
  appointmentGroups, indirectChildLeftOffset,
) => appointmentGroups.map((appointmentForest) => {
  const { items, roots } = appointmentForest;
  const firstNode = items[0];
  return {
    ...appointmentForest,
    items: items.length === 1
      ? [{
        ...firstNode,
        data: {
          ...firstNode.data,
          left: 0,
          width: 1,
        },
      }]
      : calculateRootsMetaData(items, roots, indirectChildLeftOffset) as CalculatedTreeNode[],
  };
});

const calculateRootsMetaData: CalulateRootsMetaDataFn = (
  appointmentNodes, roots, indirectChildLeftOffset,
) => {
  const appointments = appointmentNodes.map(props => ({ ...props })) as CalculatedTreeNode[];

  roots.forEach((appointmentIndex) => {
    const appointment = appointments[appointmentIndex];
    const { left, width } = calculateAppointmentLeftAndWidth(
      appointments, undefined, appointment, MAX_WIDTH, indirectChildLeftOffset, undefined,
    );
    appointment.data.left = left;
    appointment.data.width = width;
    calculateChildrenMetaData(appointments, appointment, MAX_WIDTH, indirectChildLeftOffset);
  });
  return appointments;
};

const calculateChildMetaData: CalculateChildMetaDataFn = (
  appointmentNodes, appointmentIndex, maxWidth, indirectChildLeftOffset,
) => {
  const appointment = appointmentNodes[appointmentIndex];
  const { left, width } = calculateAppointmentLeftAndWidth(
    appointmentNodes, undefined, appointment, maxWidth, indirectChildLeftOffset, undefined,
  );
  appointment.data.left = left;
  appointment.data.width = width;

  calculateChildrenMetaData(
    appointmentNodes, appointment, maxWidth, indirectChildLeftOffset,
  );
};

const calculateChildrenMetaData: CalculateChildrenMetaDataFn = (
  appointmentNodes, appointmentNode, maxWidth, indirectChildLeftOffset,
) => {
  appointmentNode.children.forEach((childIndex) => {
    calculateChildMetaData(appointmentNodes, childIndex, maxWidth, indirectChildLeftOffset);
  });
};

export const calculateAppointmentLeftAndWidth: CalculateAppointmentLeftAndWidthFn = (
  appointmentNodes, blocks, appointmentNode, maxRight, indirectChildLeftOffset, defaultLeft,
) => {
  const {
    hasDirectChild, treeDepth, isDirectChild, parent: parentIndex, children, blockIndex,
  } = appointmentNode as TreeNodeInBlock;
  const firstChild = appointmentNodes[children[0]];
  const firstChildBlockIndex = (firstChild as TreeNodeInBlock)?.blockIndex;

  const hasDirectChildAndInSameBlock = hasDirectChild
    && (firstChildBlockIndex === undefined || (blockIndex === firstChildBlockIndex
      || blocks![firstChildBlockIndex].includedInto === blockIndex
      || maxRight === 1));

  if (parentIndex === undefined) {
    return ({
      width: hasDirectChildAndInSameBlock ? maxRight / (treeDepth + 1) : maxRight,
      left: 0,
    });
  }

  const parent = appointmentNodes[parentIndex];
  const {
    width: parentWidth,
    left: parentLeft,
  } = parent.data;
  const calculatedLeft = isDirectChild
    ? parentLeft + parentWidth : parentLeft + indirectChildLeftOffset;
  const left = defaultLeft !== undefined ? Math.max(defaultLeft, calculatedLeft) : calculatedLeft;
  const unoccupiedSpace = maxRight - left;

  return ({
    width: hasDirectChildAndInSameBlock ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });
};

export const prepareToGroupIntoBlocks: PrepareToGroupIntoBlocksFn =
  appointments => appointments.map((appointmentForest) => {
    const { items: nodes } = appointmentForest;
    const appointmentNodes = nodes.map(props => ({
      ...props,
    })) as TreeNodeWithOverlappingSubTreeRoots[];

    appointmentNodes.forEach((appointmentNode, index) => {
      if (index === 0) {
        appointmentNode.overlappingSubTreeRoots = [];
        return;
      }
      const overlappingSubTreeRoots = [] as any[];
      const { offset: appointmentOffset, end } = appointmentNode.data;

      let nextChildIndex = index + 1;
      let currentBlockEnd;
      while (isPossibleChild(appointmentNodes, nextChildIndex, end, appointmentOffset)) {
        const nextAppointment = appointmentNodes[nextChildIndex];
        if (nextAppointment.data.offset < appointmentOffset
          && nextAppointment.maxOffset === undefined) {
          nextAppointment.maxOffset = appointmentOffset;
        }

        const previousSubTreeRoot = overlappingSubTreeRoots.length > 0
          ? appointmentNodes[overlappingSubTreeRoots[overlappingSubTreeRoots.length - 1]]
          : undefined;
        if (isOverlappingSubTreeRoot(
          appointmentNode, nextAppointment, previousSubTreeRoot, currentBlockEnd,
        )) {
          overlappingSubTreeRoots.push(nextChildIndex);
          nextAppointment.overlappingSubTreeRoot = true;
          const maxChildDate = findChildrenMaxEndDate(appointmentNodes, nextAppointment);
          if (!currentBlockEnd || currentBlockEnd.isBefore(maxChildDate)) {
            currentBlockEnd = maxChildDate;
          }
        }
        nextChildIndex += 1;
      }
      appointmentNode.overlappingSubTreeRoots = overlappingSubTreeRoots;
    });
    return {
      ...appointmentForest,
      items: appointmentNodes,
    };
  });

export const isOverlappingSubTreeRoot: IsOverlappingSubTreeRootFn = (
  appointmentNode, nextAppointment, previousSubTreeRoot, previousEndDate,
) => {
  const {
    overlappingSubTreeRoot, maxOffset, data: nextData,
  } = nextAppointment;
  const { offset: nextOffset, start: nextStart } = nextData;
  const { offset } = appointmentNode.data;

  return (
    nextOffset < offset
      && !overlappingSubTreeRoot
      && (maxOffset === undefined || maxOffset >= offset)
      && (!previousSubTreeRoot
        || (previousSubTreeRoot.data.offset >= nextOffset
        && nextStart.isSameOrAfter(previousEndDate)))
  );
};

export const findChildrenMaxEndDate: FindChildrenMaxEndDateFn = (
  appointmentNodes, appointmentNode,
) => {
  const { children, data } = appointmentNode;
  const { end } = data;

  const maxDate = children.reduce((currentMaxDate, childIndex) => {
    const child = appointmentNodes[childIndex];
    const maxChildrenDate = findChildrenMaxEndDate(appointmentNodes, child);
    if (maxChildrenDate.isAfter(currentMaxDate)) {
      return maxChildrenDate;
    }
    return currentMaxDate;
  }, end);
  return maxDate;
};

export const groupAppointmentsIntoBlocks: GroupAppointmentsIntoBlocksFn =
  appointmentForests => appointmentForests.map((appointmentForest) => {
    const { items, reduceValue } = appointmentForest;
    const { blocks: nextBlocks, appointments } = items.reduce((acc, appointment, index) => {
      const blocks = acc.blocks.slice();
      const {
        treeDepth, data, overlappingSubTreeRoots,
      } = appointment;
      const { offset, start, end } = data;
      let blockIndex = findBlockIndexByAppointment(blocks, appointment);

      if (blockIndex < 0) {
        blocks.push({
          start, end, minOffset: offset, maxOffset: offset + treeDepth,
          size: treeDepth + 1, items: [], endForChildren: end,
        });
        blockIndex = blocks.length - 1;
      }

      blocks[blockIndex].items.push(index);

      overlappingSubTreeRoots.forEach((subTreeRootIndex) => {
        const subTreeRoot = items[subTreeRootIndex];
        const { data: subTreeRootData } = subTreeRoot;
        blocks.push({
          start: subTreeRootData.start, end,
          minOffset: subTreeRootData.offset, maxOffset: offset - 1,
          size: calculateBlockSizeByEndDate(items, subTreeRoot, end), items: [],
          endForChildren: subTreeRootData.end,
        });
      });
      const appointmentInBlock = { ...appointment, blockIndex };

      return {
        blocks,
        appointments: [...acc.appointments, appointmentInBlock],
      };
    }, {
      blocks: [{
        start: items[0].data.start,
        end: items[0].data.end,
        minOffset: 0,
        maxOffset: reduceValue - 1,
        size: reduceValue,
        items: [],
        endForChildren: items[0].data.end,
      }] as AppointmentBlock[],
      appointments: [] as TreeNodeInBlock[],
    });
    return {
      blocks: nextBlocks,
      appointmentForest: {
        ...appointmentForest,
        items: appointments,
      },
    };
  });

const calculateBlockSizeByEndDate: CalculateBlockSizeBEndDateFn = (
  appointmentNodes, subTreeRoot, blockEndDate,
) => {
  const { children, data } = subTreeRoot;
  const { start } = data;

  if (children.length === 0) {
    if (blockEndDate.isAfter(start)) {
      return 1;
    }
    return 0;
  }
  const maxSize = Math.max(
    ...children.map(childIndex => calculateBlockSizeByEndDate(
      appointmentNodes, appointmentNodes[childIndex], blockEndDate),
    ),
  );

  if (blockEndDate.isSameOrBefore(start) && maxSize === 0) {
    return 0;
  }
  return maxSize + 1;
};

export const findBlockIndexByAppointment: FindBlockIndexByAppointmentFn = (
  blocks, appointment,
) => {
  const { start, offset } = appointment.data;

  let blockIndex = blocks.length - 1;
  while (blockIndex >= 0) {
    const currentBlock = blocks[blockIndex];
    if (intervalIncludes(currentBlock.start, currentBlock.end, start)
      && offset >= currentBlock.minOffset && offset <= currentBlock.maxOffset &&
      (!appointment.overlappingSubTreeRoot ||
        appointment.overlappingSubTreeRoot && !currentBlock.items.length)
    ) {
      break;
    }
    blockIndex -= 1;
  }

  return blockIndex;
};

export const findIncludedBlocks: FindIncludedBlocksFn = (groupedIntoBlocks) => {
  return groupedIntoBlocks.map(({ blocks, appointmentForest }) => {
    const nextBlocks = blocks.map(props => ({ ...props })) as IncludedBlock[];

    nextBlocks.forEach((block, blockIndex) => {
      block.includedBlocks = [];
      for (
        let currentBlockIndex = blockIndex + 1;
        currentBlockIndex < nextBlocks.length;
        currentBlockIndex += 1
      ) {
        const currentBlock = nextBlocks[currentBlockIndex];
        if (isIncludedBlock(block, currentBlock)) {
          block.includedBlocks.push(currentBlockIndex);
          currentBlock.includedInto = blockIndex;
        }
      }
    });
    return {
      blocks: nextBlocks, appointmentForest,
    };
  });
};

const isIncludedBlock: IsIncludedBlockFn = (block, possibleIncludedBlock) => {
  const { start, end, minOffset, maxOffset } = block;
  const {
    start: possibleIncludedStart, end: possibleIncludedEnd,
    minOffset: possibleMinOffset, maxOffset: possibleMaxOffset,
  } = possibleIncludedBlock;
  return intervalIncludes(start, end, possibleIncludedStart)
    && intervalIncludes(start, end, possibleIncludedEnd)
    && possibleMaxOffset <= maxOffset && possibleMinOffset >= minOffset;
};

export const findChildBlocks: FindChildBlocksFn = (groupedIntoBlocks) => {
  return groupedIntoBlocks.map(({ blocks, appointmentForest }) => {
    const nextBlocks = blocks.map(props => ({ ...props })) as BlockWithChildren[];

    nextBlocks.forEach((block, index) => {
      block.children = [];
      for (let currentIndex = index + 1; currentIndex < nextBlocks.length; currentIndex += 1) {
        const nextBlock = nextBlocks[currentIndex];

        if (isChildBlock(block, nextBlock)) {
          block.children.push(currentIndex);
          nextBlock.parent = index;
        }
      }
      return block;
    });
    return {
      appointmentForest, blocks: nextBlocks,
    };
  });
};

const isChildBlock: IsChildBlockFn = (block, possibleChildBlock) => {
  const { start, endForChildren, minOffset, includedInto } = block;
  const {
    start: childStart, includedInto: childIncludedInto, maxOffset: childMaxOffset,
  } = possibleChildBlock;
  return intervalIncludes(start, endForChildren, childStart)
    && childMaxOffset + 1 === minOffset
    && (
      childIncludedInto === undefined
      || childIncludedInto === includedInto
    );
};

export const adjustByBlocks: AdjustByBlocksFn = (
  groupedIntoBlocks, indirectChildLeftOffset,
) => {
  const updatedBlocks = groupedIntoBlocks.map(({ blocks, appointmentForest }) => {
    const dimensionsCalculated = calculateBlocksDimensions(blocks, appointmentForest.items);

    return {
      blocks: alignBlocksWithPrevious(dimensionsCalculated, appointmentForest.items),
      appointmentForest,
    };
  });
  const adjustedByBlocks = updatedBlocks.map(({ blocks, appointmentForest }) => {
    return {
      ...appointmentForest,
      items: adjustAppointmentsByBlocks(
        appointmentForest.items, blocks, indirectChildLeftOffset,
        ) as TreeNodeInBlock[],
    };
  });
  return adjustedByBlocks;
};

const calculateBlocksDimensions: CalculateBlockDimensionsFn = (
  blocks, appointments,
) => updateBlocksProportions(calculateBlocksLeftLimit(
  calculateBlocksTotalSize(blocks), appointments,
));

const alignBlocksWithPrevious: AlignBlocksWithPreviousFn = (blocks, appointments) => {
  const nextBlocks = blocks.map(({ right, ...restProps }) => ({ ...restProps }));

  const leftLimitCalculated = calculateBlocksLeftLimit(
    updateBlocksLeft(nextBlocks as CalculatedBlock[], appointments), appointments,
  );
  return updateBlocksProportions(leftLimitCalculated);
};

const adjustAppointmentsByBlocks: AdjustAppointemntsByBlocksFn = (
  appointments, blocks, indirectChildLeftOffset,
) => {
  const nextAppointments = appointments.map(props => ({ ...props }));
  const nextBlocks = blocks.map(props => ({ ...props }));

  nextBlocks.forEach((block, index) => {
    if (index !== 0) {
      const { items, left: blockLeft, right, children } = block;
      const maxRight = calculateIncludedBlockMaxRight(nextBlocks, block);
      const finalMaxRight = maxRight * right;
      const defaultLeft = blockLeft! * maxRight;

      items.forEach((appointmentIndex, itemIndex) => {
        const appointment = nextAppointments[appointmentIndex];
        if (itemIndex === 0) {
          const { left, width } = calculateAppointmentLeftAndWidth(
            nextAppointments, nextBlocks, appointment,
            finalMaxRight, indirectChildLeftOffset, defaultLeft,
          );
          appointment.data.left = left;
          appointment.data.width = width;
          if (defaultLeft !== left) {
            children.forEach((childIndex) => {
              redistributeChildBlocks(nextBlocks, childIndex, left / maxRight);
            });
          }
        } else {
          const {
            left, width,
          } = calculateAppointmentLeftAndWidth(
            nextAppointments, nextBlocks, appointment,
            finalMaxRight, indirectChildLeftOffset, undefined,
          );
          appointment.data.left = left;
          appointment.data.width = width;
        }
      });
    }
  });
  blocks[0].items.forEach((appointmentIndex) => {
    const appointment = nextAppointments[appointmentIndex];
    const {
      left, width,
    } = calculateAppointmentLeftAndWidth(
      nextAppointments, blocks, appointment, 1, indirectChildLeftOffset, undefined,
    );
    appointment.data.left = left;
    appointment.data.width = width;
  });
  return nextAppointments;
};

const redistributeChildBlocks: RedistributeBlocksFn = (blocks, blockIndex, right) => {
  const block = blocks[blockIndex];
  const { leftOffset, size, leftLimit, children } = block;
  block.right = right;
  const width = size + leftOffset;
  const relativeWidth = right - leftLimit;
  const left = right - relativeWidth * size / width;
  block.left = left;
  children.forEach((childIndex) => {
    redistributeChildBlocks(blocks, childIndex, left);
  });
};

export const calculateIncludedBlockMaxRight: CalculateIncludedBlockMaxRightFn = (
  blocks, includedBlock,
) => {
  const { includedInto: includedIntoIndex } = includedBlock;
  if (includedIntoIndex === undefined) {
    return 1;
  }

  const includedInto = blocks[includedIntoIndex];
  const currentMaxRight = includedInto.right;
  return currentMaxRight * calculateIncludedBlockMaxRight(blocks, includedInto);

};

export const calculateBlocksTotalSize: CalculateBlocksTotalSizeFn = (blocks) => {
  const result = blocks.map((block) => {
    const totalSize = calculateSingleBlockTotalSize(blocks, block);
    return {
      ...block,
      totalSize,
      leftOffset: totalSize - block.size,
    };
  });
  return result;
};

const calculateSingleBlockTotalSize: CalculateSingleBlockTotalSizeFn = (
  blocks, block,
) => {
  const { children, size } = block;
  if (children.length === 0) {
    return size;
  }
  return Math.max(
    ...children.map(childIndex => calculateSingleBlockTotalSize(blocks, blocks[childIndex])),
  ) + size;
};

export const calculateBlocksLeftLimit: CalculateBlocksLeftLimitFn = (
  blocks, appointments,
) => (blocks as CalculatedBlock[]).map((block) => {
  const leftLimit = calculateSingleBlockLeftLimit(blocks, appointments, block);
  return {
    ...block,
    leftLimit,
  };
});

const calculateSingleBlockLeftLimit: CalculateSingleBlockLeftLimitFn = (
  blocks, appointments, block,
) => {
  const { children, items, left } = block as CalculatedBlock;
  if (children.length === 0) {
    return left !== undefined
      ? Math.min(left, appointments[items[0]].data.left)
      : appointments[items[0]].data.left;
  }
  return Math.min(
    ...children.map(childIndex => calculateSingleBlockLeftLimit(
      blocks, appointments, blocks[childIndex],
    )),
  );
};

export const updateBlocksProportions: UpdateBlocksProportionsFn = (blocks) => {
  const nextBlocks = (blocks as CalculatedBlock[]).map(props => ({ ...props }));

  nextBlocks.forEach((block) => {
    const { parent: parentIndex, leftLimit, leftOffset, totalSize } = block;
    if (parentIndex === undefined) {
      block.right = 1;
      block.left = (1 - leftLimit) * leftOffset / totalSize + leftLimit;
      return;
    }

    const parent = nextBlocks[parentIndex];
    const { left: parentLeft, totalSize: parentTotalSize } = parent as CalculatedBlock;
    block.totalSize = parentTotalSize;
    block.right = parentLeft as number;
    block.left = (1 - leftLimit) * leftOffset / parentTotalSize + leftLimit;
  });

  return nextBlocks;
};

export const updateBlocksLeft: UpdateBlocksLeftFn = (
  blocks, appointments,
) => blocks.map((block) => {
  const { items, left } = block;
  const firstItem = appointments[items[0]];
  const { parent: firstItemParentIndex } = firstItem;
  if (firstItemParentIndex === undefined) {
    return block;
  }

  const firstItemParent = appointments[firstItemParentIndex];
  const parentBlock = blocks[firstItemParent.blockIndex];

  return {
    ...block,
    left: parentBlock.parent === undefined ? left : blocks[parentBlock.parent].left,
  };
});

const createAndAdjustAppointmentForest: CreateAndAdjustAppointmentForestFn = (
  appointmentGroups, cellDuration,
) => {
  const appointmentForest = createAppointmentForest(appointmentGroups, cellDuration);
  const indirectChildLeftOffset = Math.min(
    1 / findMaxReduceValue(appointmentForest),
    INDIRECT_CHILD_LEFT_OFFSET,
  );
  const baseCalculated = calculateAppointmentsMetaData(
    appointmentForest, indirectChildLeftOffset,
  );

  const preparedToGroupIntoBlocks = prepareToGroupIntoBlocks(baseCalculated);
  const groupedIntoBlocks = groupAppointmentsIntoBlocks(preparedToGroupIntoBlocks);
  const blocksWithIncluded = findIncludedBlocks(groupedIntoBlocks);
  const blocksWithParents = findChildBlocks(blocksWithIncluded);
  return adjustByBlocks(blocksWithParents, indirectChildLeftOffset);
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

  const groupsCalculated = calculateAppointmentOffsets(
    grouped as any[], isHorizontal,
  );
  const isAppointmentForestNeeded = !isHorizontal && !placeAppointmentsNextToEachOther;
  let appointmentForest: GroupedIntoBlocksForest[];

  if (isAppointmentForestNeeded) {
    appointmentForest = createAndAdjustAppointmentForest(
      groupsCalculated as AppointmentGroup[], cellDuration,
    ) as GroupedIntoBlocksForest[];
  }

  const unwrappedAppointments = isAppointmentForestNeeded
    ? unwrapAppointmentForest(appointmentForest!)
    : unwrapGroups(groupsCalculated);
  const rects = unwrappedAppointments.map(appointment => rectCalculator(
    appointment, viewMetaData,
    { rectByDates, multiline, rectByDatesMeta },
  ));
  return rects.sort((first, second) => first.offset! >= second.offset! ? 1 : -1);
};
