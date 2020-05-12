import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentMoment } from './all-day-panel.types';
import { AppointmentModel } from './scheduler-core.types';
import { Rect } from './horizontal-rect.types';
import { ValidResourceInstance } from '../types';
import { GroupOrientation } from './grouping-state.types';

interface GroupItem {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
  resources?: Array<ValidResourceInstance>;
}

/** @internal */
export interface AppointmentGroup {
  items: GroupItem[];
  reduceValue: number;
}

interface TreeNodeData extends GroupItem {
  left: number;
  width: number;
}

type AppointmentIndex = number;
type BlockIndex = number;

interface TreeNodeBase {
  data: GroupItem;
  parent?: AppointmentIndex;
}

interface IncompleteTreeNode extends TreeNodeBase {
  children?: AppointmentIndex[];
  hasDirectChild?: boolean;
  isDirectChild?: boolean;
  treeDepth?: number;
}

interface TreeNode extends TreeNodeBase {
  children: AppointmentIndex[];
  hasDirectChild: boolean;
  isDirectChild: boolean;
  treeDepth: number;
}

/** @internal */
export interface CalculatedTreeNode extends TreeNode {
  data: TreeNodeData;
}

/** @internal */
export interface TreeNodeWithOverlappingSubTreeRoots extends CalculatedTreeNode {
  overlappingSubTreeRoots: AppointmentIndex[];
  overlappingSubTreeRoot?: boolean;
  maxOffset?: number;
}

/** @internal */
export interface TreeNodeInBlock extends TreeNodeWithOverlappingSubTreeRoots {
  blockIndex: BlockIndex;
}

interface AppointmentForest {
  items: TreeNode[];
  reduceValue: number;
  roots: AppointmentIndex[];
}

interface CalculatedAppointmentForest extends AppointmentForest {
  items: CalculatedTreeNode[];
}

interface AppointmentForestWithOverlappingSubTreeRoots extends AppointmentForest {
  items: TreeNodeWithOverlappingSubTreeRoots[];
}

/** @internal */
export interface GroupedIntoBlocksForest extends AppointmentForestWithOverlappingSubTreeRoots {
  items: TreeNodeInBlock[];
}

/** @internal */
export interface AppointmentBlock {
  items: AppointmentIndex[];
  start: moment.Moment;
  end: moment.Moment;
  minOffset: number;
  maxOffset: number;
  size: number;
  endForChildren: moment.Moment;
}

/** @internal */
export interface IncludedBlock extends AppointmentBlock {
  includedBlocks: BlockIndex[];
  includedInto?: BlockIndex;
}

/** @internal */
export interface BlockWithChildren extends IncludedBlock {
  children: BlockIndex[];
  parent?: BlockIndex;
}

/** @internal */
export interface BlockWithLeftOffset extends BlockWithChildren {
  totalSize: number;
  leftOffset: number;
}

/** @internal */
export interface BlockWithLeftLimit extends BlockWithLeftOffset {
  leftLimit: number;
}

/** @internal */
export interface CalculatedBlock extends BlockWithLeftLimit {
  left?: number;
  right: number;
}

interface AppointmentsGroupedIntoBlocks {
  appointmentForest: GroupedIntoBlocksForest;
  blocks: AppointmentBlock[];
}

interface AppointmentsGroupedIntoIncludedBlocks extends AppointmentsGroupedIntoBlocks {
  blocks: IncludedBlock[];
}

interface AppointmentsInBlocksWithChildren extends AppointmentsGroupedIntoIncludedBlocks {
  blocks: BlockWithChildren[];
}

/** @internal */
export interface AppointmentUnwrappedGroup extends GroupItem {
  reduceValue: number;
  fromPrev: boolean;
  toNext: boolean;
  width?: number;
  left?: number;
}

/** @internal */
export interface ElementRect extends Rect {
  dataItem: AppointmentModel;
  type: string;
  fromPrev: boolean;
  toNext: boolean;
  durationType?: 'short' | 'middle' | 'long';
  resources?: Array<ValidResourceInstance>;
  offset?: number;
}

/** @internal */
export interface ViewMetaData {
  groupOrientation: GroupOrientation;
  groupedByDate: boolean;
  groupCount: number;
}

/** @internal */
export type CalculateRectByDateAndGroupIntervalsFn = PureComputed<
  [any, AppointmentMoment[][], (...args: any) => any, any,
  ViewMetaData], ElementRect[]
>;

/** @internal */
export interface AppointmentForestRoots {
  appointments: TreeNode[];
  roots: AppointmentIndex[];
}

/** @internal */
export type CreateAppointmentForestFn = PureComputed<
  [AppointmentGroup[], number], AppointmentForest[]
>;

/** @internal */
export type VisitRootsFn = PureComputed<
  [GroupItem[], number], AppointmentForestRoots
>;

/** @internal */
export type VisitChildFn = PureComputed<
  [IncompleteTreeNode[], number, number, number, boolean, number], number
>;

/** @internal */
export type VisitAllChildrenFn = PureComputed<
  [IncompleteTreeNode[], number, number, number], number
>;

/** @internal */
export type IsPossibleChildFn = PureComputed<
  [IncompleteTreeNode[], number, moment.Moment, number], boolean
>;

/** @internal */
export type FindMaxReduceValueFn = PureComputed<
  [AppointmentForest[]], number
>;

/** @internal */
export type CalculateAppointmentsMetaDataFn = PureComputed<
  [AppointmentForest[], number], CalculatedAppointmentForest[]
>;

/** @internal */
export type CalulateRootsMetaDataFn = PureComputed<
  [TreeNode[], AppointmentIndex[], number], CalculatedTreeNode[]
>;

/** @internal */
export type CalculateChildMetaDataFn = PureComputed<
  [CalculatedTreeNode[], number, number, number], void
>;

/** @internal */
export type CalculateChildrenMetaDataFn = PureComputed<
  [CalculatedTreeNode[], CalculatedTreeNode, number, number], void
>;

interface AppointmentLeftAndWidth {
  left: number;
  width: number;
}
/** @internal */
export type CalculateAppointmentLeftAndWidthFn = PureComputed<
  [CalculatedTreeNode[] | TreeNodeInBlock[], any[] | undefined, CalculatedTreeNode,
  number, number, number | undefined], AppointmentLeftAndWidth
>;

/** @internal */
export type PrepareToGroupIntoBlocksFn = PureComputed<
  [CalculatedAppointmentForest[]], AppointmentForestWithOverlappingSubTreeRoots[]
>;

/** @internal */
export type IsOverlappingSubTreeRootFn = PureComputed<
  [TreeNodeWithOverlappingSubTreeRoots, TreeNodeWithOverlappingSubTreeRoots,
    TreeNodeWithOverlappingSubTreeRoots | undefined, moment.Moment | undefined], boolean
>;

/** @internal */
export type FindChildrenMaxEndDateFn = PureComputed<
  [TreeNode[], TreeNode], moment.Moment
>;

/** @internal */
export type GroupAppointmentsIntoBlocksFn = PureComputed<
  [AppointmentForestWithOverlappingSubTreeRoots[]], AppointmentsGroupedIntoBlocks[]
>;

/** @internal */
export type CalculateBlockSizeBEndDateFn = PureComputed<
  [TreeNodeWithOverlappingSubTreeRoots[], TreeNodeWithOverlappingSubTreeRoots,
  moment.Moment], number
>;

/** @internal */
export type FindBlockIndexByAppointmentFn = PureComputed<
  [AppointmentBlock[], TreeNodeWithOverlappingSubTreeRoots], BlockIndex
>;

/** @internal */
export type FindIncludedBlocksFn = PureComputed<
  [AppointmentsGroupedIntoBlocks[]], AppointmentsGroupedIntoIncludedBlocks[]
>;

/** @internal */
export type IsIncludedBlockFn = PureComputed<
  [AppointmentBlock, AppointmentBlock], boolean
>;

/** @internal */
export type FindChildBlocksFn = PureComputed<
  [AppointmentsGroupedIntoIncludedBlocks[]], AppointmentsInBlocksWithChildren[]
>;

/** @internal */
export type IsChildBlockFn = PureComputed<
  [IncludedBlock, IncludedBlock], boolean
>;

/** @internal */
export type AdjustByBlocksFn = PureComputed<
  [AppointmentsInBlocksWithChildren[], number], GroupedIntoBlocksForest[]
>;

/** @internal */
export type CalculateBlockDimensionsFn = PureComputed<
  [BlockWithChildren[], TreeNodeInBlock[]], CalculatedBlock[]
>;

/** @internal */
export type AlignBlocksWithPreviousFn = PureComputed<
  [CalculatedBlock[], TreeNodeInBlock[]], CalculatedBlock[]
>;

/** @internal */
export type AdjustAppointemntsByBlocksFn = PureComputed<
  [TreeNodeInBlock[], CalculatedBlock[], number], TreeNodeInBlock[]
>;

/** @internal */
export type RedistributeBlocksFn = PureComputed<
  [CalculatedBlock[], number, number], void
>;

/** @internal */
export type CalculateIncludedBlockMaxRightFn = PureComputed<
  [CalculatedBlock[], CalculatedBlock], number
>;

/** @internal */
export type CalculateBlocksTotalSizeFn = PureComputed<
  [BlockWithChildren[]], BlockWithLeftOffset[]
>;

/** @internal */
export type CalculateSingleBlockTotalSizeFn = PureComputed<
  [BlockWithChildren[], BlockWithChildren], number
>;

/** @internal */
export type CalculateBlocksLeftLimitFn = PureComputed<
  [BlockWithLeftOffset[] | CalculatedBlock[], TreeNodeInBlock[]], BlockWithLeftLimit[]
>;

/** @internal */
export type CalculateSingleBlockLeftLimitFn = PureComputed<
  [BlockWithLeftOffset[] | CalculatedBlock[], TreeNodeInBlock[],
  BlockWithLeftOffset | CalculatedBlock], number
>;

/** @internal */
export type UpdateBlocksProportionsFn = PureComputed<
  [BlockWithLeftLimit[] | CalculatedBlock[]], CalculatedBlock[]
>;

/** @internal */
export type UpdateBlocksLeftFn = PureComputed<
  [CalculatedBlock[], TreeNodeInBlock[]], CalculatedBlock[]
>;

/** @internal */
export type CreateAndAdjustAppointmentForestFn = PureComputed<
  [AppointmentGroup[], number], GroupedIntoBlocksForest[]
>;
