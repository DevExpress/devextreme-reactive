import { GroupingPanelItem } from '../index';
// tslint:disable-next-line: no-namespace
export namespace GroupingPanel {
  /** Describes properties passed to a component that renders a group panel container. */
  export interface ContainerProps {
    /** A React node to be placed in the root layout. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a group panel item template when it is being rendered. */
  export interface ItemProps {
    /** The Grouping Panel item. */
    item: GroupingPanelItem;
    /** Specifies whether to display a button that cancels grouping by column. */
    showGroupingControls: boolean;
    /** Specifies whether to render controls that toggle the column's sorting state. */
    showSortingControls: boolean;
    /** Specifies whether grouping by a column is enabled. */
    groupingEnabled: boolean;
    /** Specifies whether sorting by a column is enabled. */
    sortingEnabled: boolean;
    /** Specifies the sorting direction. */
    sortingDirection?: 'asc' | 'desc';
    /*** An event that initiates changing the column sorting direction.
     * Cancels sorting by the current column if `direction` is set to null. */
    onSort: (parameters: { direction?: 'asc' | 'desc' | null, keepOther?: boolean }) => void;
    /** An event that initiates grouping by column. */
    onGroup: () => void;
  }

  /** Describes properties passed to a component that renders an empty group panel message. */
  export interface EmptyMessageProps {
    /** Returns the text displayed in the group panel if grid data is not grouped. */
    getMessage: (messageKey: string) => string;
  }

  export interface LocalizationMessages {
    /** The text displayed in the group panel if the grid is not grouped. */
    groupByColumn?: string;
  }

  /** @internal */
  export type LayoutProps = {
    items: ReadonlyArray<GroupingPanelItem>;
    isColumnGroupingEnabled?: (colName: string) => boolean;
    draggingEnabled?: boolean;
    onGroup?: (payload?: any) => void;
    onGroupDraft?: (payload?: any) => void;
    onGroupDraftCancel?: (payload?: any) => void;
    itemComponent: React.ComponentType<{
      item: GroupingPanelItem;
      forwardedRef?: React.Ref<Element>;
    }>;
    emptyMessageComponent: React.ComponentType<{
      forwardedRef?: React.Ref<Element>;
    }>;
    containerComponent: React.ComponentType;
  };

  /** @internal */
  export type GroupingItemLayoutProps = {
    item: GroupingPanelItem;
    itemComponent: React.ComponentType<{
      item: GroupingPanelItem;
      forwardedRef?: React.Ref<Element>;
    }>;
    itemRef: React.Ref<Element>;
    draggingEnabled?: boolean;
    onDragStart?: () => void;
    onDragEnd?: () => void;
  };

  /** @internal */
  export type GroupingItemLayoutState = {
    sourceColumnName?: string | null,
    targetItemIndex?: number,
    dragging?: boolean,
  };
}

export interface GroupingPanelProps {
  /*** Specifies whether to render controls that toggle the column's sorting state.
   * Requires the SortingState dependency. */
  showSortingControls?: boolean;
  /** Specifies whether column headers display a button that cancels grouping by that column. */
  showGroupingControls?: boolean;
  /** A component that renders a group panel container. */
  containerComponent: React.ComponentType<GroupingPanel.ContainerProps>;
  /** A component that renders a group panel item. */
  itemComponent: React.ComponentType<
    GroupingPanel.ItemProps & { forwardedRef?: React.Ref<Element> }
  >;
  /** A component that renders an empty group panel message. */
  emptyMessageComponent: React.ComponentType<
    GroupingPanel.EmptyMessageProps & { forwardedRef?: React.Ref<Element> }
  >;
  /** An object that specifies the localization messages. */
  messages?: GroupingPanel.LocalizationMessages;
  /** @internal */
  layoutComponent: React.ComponentType<GroupingPanel.LayoutProps>;
}
