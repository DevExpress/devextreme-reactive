import * as React from 'react';
import {
  GroupingPanelContainerProps,
  GroupingPanelItemProps,
  GroupingPanelEmptyMessageProps,
} from '@devexpress/dx-react-grid';

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

interface GroupingPanelComponentType extends React.ComponentClass<GroupingPanelProps> {
  Container:  React.ComponentType<GroupingPanelContainerProps>;
  Item: React.ComponentType<GroupingPanelItemProps>;
  EmptyMessage: React.ComponentType<GroupingPanelEmptyMessageProps>;
}

export declare const GroupingPanel: GroupingPanelComponentType;
