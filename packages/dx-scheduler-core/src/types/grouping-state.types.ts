/** Describes grouping options. */
export interface Grouping {
  /** The name of the resource by which the appointments are grouped. */
  resourceName: string;
}
/** Describes a group that can be nested in another one. */
export type GroupKey = string;
/** Describes group orientation (either Vertical or Horizontal) */
export type GroupOrientation = 'Vertical' | 'Horizontal';

/** @internal */
export type ResourceGroupingState = {
  grouping?: Grouping[],
  expandedGroups?: ReadonlyArray<string>,
};
/** @internal */
export type ToggleGroupPayload = { groupKey: GroupKey };
