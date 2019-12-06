import { GroupingItem } from '@devexpress/dx-scheduler-core';
import { BaseView } from '../views';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export namespace GroupingPanel {
  /** Describes properties passed to a component that renders a Grouping panel horizontal layout. */
  export interface HorizontalLayoutProps {
    /** A component that renders a Grouping panel row. */
    rowComponent: React.ComponentType<GroupingPanel.RowProps>;
    /** A component that renders a Grouping panel cell. */
    cellComponent: React.ComponentType<GroupingPanel.CellProps>;
    /** Specifies the final representation of Scheduler's groups and the order they will be rendered in. */
    groups: Array<Array<GroupingItem>>;
    /** Indicates the number of cells in the Scheduler's timetable. */
    width: number;
  }
  /** Describes properties passed to a component that renders a Grouping panel row. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a Grouping panel cell. */
  export interface CellProps {
    /** Specifies the cell's size in the number of Scheduler's timetable cells. */
    colSpan: number;
    /** The group the cell represents. */
    groupingItem: GroupingItem;
  }
}

export interface GroupingPanelProps {
  /** A component that renders a Grouping panel horizontal layout. */
  horizontalLayoutComponent: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
  /** A component that renders a Grouping panel row. */
  rowComponent: React.ComponentType<GroupingPanel.RowProps>;
  /** A component that renders a Grouping panel cell. */
  cellComponent: React.ComponentType<GroupingPanel.CellProps>;
}
