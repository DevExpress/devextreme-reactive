import { Group } from '../index';
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
  /** Describes properties passed to a component that renders a row on the grouping panel. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a cell in a row on the grouping panel. */
  export interface CellProps {
    /** The number of columns the cell spans. */
    colSpan: number;
    /** The group the cell represents. */
    group: Group;
    /** The cell's offset from the left. */
    left: number;
    /** Indicates whether to draw a bright right border or an ordinary right border. */
    brightRightBorder?: boolean;
    /** Indicates whether to draw a bright top border or an ordinary top border. */
    brightTopBorder?: boolean;
    /** A React node used to render an additional content to the cell. */
    children?: React.ReactNode;
  }
}

export interface GroupingPanelProps {
  /** A component that renders the grouping panel horizontally. */
  horizontalLayoutComponent: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
  /** A component that renders a row on the grouping panel. */
  rowComponent: React.ComponentType<GroupingPanel.RowProps>;
  /** A component that renders a cell in a row on the grouping panel. */
  cellComponent: React.ComponentType<GroupingPanel.CellProps>;
}
