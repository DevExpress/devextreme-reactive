import * as React from 'react';
import { Column } from '../grid';

export interface GroupingPanelItem {
  /** A column associated with the item. */
  column: Column;
  /** The item preview mode. Contains the "add", "remove" or "reorder" value. */
  draft?: string;
}

export interface GroupingPanelContainerProps {
  /** A React element to be placed in the root layout. */
  children?: React.ReactNode | Array<React.ReactNode>;
}

export interface GroupingPanelItemProps {
  /** The Grouping Panel item. */
  item: GroupingPanelItem;
  /** Specifies whether to display a button that cancels grouping by column. */
  showGroupingControls: boolean;
  /** Specifies whether to render controls that toggle the column's sorting state. */
  showSortingControls: boolean;
  /** Specifies the sorting direction. */
  sortingDirection?: 'asc' | 'desc';
  /** An event that initiates changing the column sorting direction. Cancels sorting by the current column if `direction` is set to null. */
  onSort: (parameters: { direction?: 'asc' | 'desc' | null }) => void;
  /** An event that initiates grouping by column. */
  onGroup: () => void;
}

export interface GroupingPanelEmptyMessageProps {
  /** Returns the text displayed in the group panel if grid data is not grouped. */
  getMessage: (messageKey: string) => string;
}

export interface GroupingPanelProps {
  /** Specifies whether to render controls that toggle the column's sorting state. Requires the SortingState dependency. */
  showSortingControls: boolean;
  /** Specifies whether column headers display a button that cancels grouping by that column. */
  showGroupingControls: boolean;
  /** A component that renders a group panel container. */
  containerComponent: React.ComponentType<GroupingPanelContainerProps>;
  /** A component that renders a group panel item. */
  itemComponent: React.ComponentType<GroupingPanelItemProps>;
  /** A component that renders an empty group panel message. */
  emptyMessageComponent: React.ComponentType<GroupingPanelEmptyMessageProps>;
  /** An object that specifies the localization messages. */
  messages: object;
}

export declare const GroupingPanel: React.ComponentType<GroupingPanelProps>;
