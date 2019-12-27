import { GroupingItem } from '../index';
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
    length: number;
    /** Style object applied to the Groping Panel's cell component. */
    cellStyle: object;
  }
  /** Describes properties passed to a component that renders a Grouping panel row. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a Grouping panel cell. */
  export interface CellProps {
    /** Specifies the cell's size in the number of Scheduler's timetable cells. */
    colSpan: number;
    /** The group the cell represents. */
    groupingItem: GroupingItem;
    /** Specifies cell's horizontal position. */
    left: number;
    /** A React node used to render an additional content to the cell. */
    children?: React.ReactNode;
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
