import { Group, GroupOrientation } from '../index';
import { BaseView } from '../views';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export namespace GroupingPanel {
  /** Describes properties passed to a component that renders the grouping panel horizontally. */
  export interface HorizontalLayoutProps {
    /** A component that renders a row on the grouping panel. */
    rowComponent: React.ComponentType<GroupingPanel.RowProps>;
    /** A component that renders a cell in a row on the grouping panel. */
    cellComponent: React.ComponentType<GroupingPanel.CellProps>;
    /** Specifies the final representation of Scheduler's groups and the order they will be rendered in. */
    groups: Array<Array<Group>>;
    /** Indicates the number of cells in the Scheduler's timetable. */
    colSpan: number;
    /** The CSS styles of a cell on the grouping panel. */
    cellStyle: object;
    /** Specifies whether to show group headings for every date or not. */
    showHeaderForEveryDate?: boolean;
  }
  /** Describes properties passed to a component that renders the grouping panel vertically. */
  export interface VerticalLayoutProps {
    /** A component that renders a row on the grouping panel. */
    rowComponent: React.ComponentType<GroupingPanel.RowProps>;
    /** A component that renders a cell in a row on the grouping panel. */
    cellComponent: React.ComponentType<GroupingPanel.CellProps> | React.ComponentType<GroupingPanel.AllDayCellProps>;
    /** Specifies the final representation of Scheduler's groups and the order they will be rendered in. */
    groups: Array<Array<Group>>;
    /** Indicates the number of cells in the Scheduler's timetable. */
    rowSpan: number;
    /** Specifies the view the layout is rendered in. */
    viewType: string;
    /** Specifies cells' text top offset. */
    cellTextTopOffset?: number;
  }
  /** Describes properties passed to a component that renders a row on the grouping panel. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a cell in a row on the grouping panel. */
  export interface CellProps {
    /** The number of columns the cell spans. */
    colSpan: number;
    /** The number of rows the cell spans. */
    rowSpan: number;
    /** The group the cell represents. */
    group: Group;
    /** Scheduler's grouping orientation: either 'Vertical' or 'Horizontal'. */
    groupOrientation?: GroupOrientation;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
    /** Indicates whether grouping by date is enabled. */
    groupedByDate?: boolean;
    /** The cell's offset from the left. */
    left: number;
    /** The cell's height. */
    height?: number;
    /** Specifies the distance between the cell's text and the top edge of the Scheduler. */
    topOffSet?: number;
    /** Specifies the CSS properties to apply to the Cell's text. */
    textStyle?: object;
    /** A React node used to render an additional content to the cell. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a cell in a row on the grouping panel in the AllDay Panel. */
  export interface AllDayCellProps {
    /** The number of rows the cell spans. */
    rowSpan: number;
    /** The group the cell represents. */
    group: Group;
    /** The cell's height. */
    height?: number;
    /** A React node used to render an additional content to the cell. */
    children?: React.ReactNode;
  }
}

export interface GroupingPanelProps {
  /** A component that renders the grouping panel horizontally. */
  horizontalLayoutComponent: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
  /** A component that renders the grouping panel vertically. */
  verticalLayoutComponent: React.ComponentType<GroupingPanel.VerticalLayoutProps>;
  /** A component that renders a row on the grouping panel. */
  rowComponent: React.ComponentType<GroupingPanel.RowProps>;
  /** A component that renders a cell in a row on the grouping panel. */
  cellComponent: React.ComponentType<GroupingPanel.CellProps>;
  /** A component that renders a cell in a row on the grouping panel in the AllDayPanel. */
  allDayCellComponent: React.ComponentType<GroupingPanel.CellProps>;
}
