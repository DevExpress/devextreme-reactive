import { GroupingItem } from '@devexpress/dx-scheduler-core';
import { BaseView } from '../views';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export namespace GroupingPanel {
  /** Describes properties passed to a component that renders a Grouping panel container. */
  export interface ContainerProps {
    /** A React node used to render the Grouping panel container content. */
    children: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a Grouping panel horizontal layout. */
  export interface HorizontalLayoutProps {
    rowComponent: React.ComponentType<GroupingPanel.RowProps>;
    cellComponent: React.ComponentType<GroupingPanel.CellProps>;
    groups: Array<Array<GroupingItem>>;
    width: number;
    /** A React node used to render the Grouping panel container content. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a Grouping panel row. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a Grouping panel horizontal layout. */
  export interface CellProps {
    width: string;
    groupingItem: GroupingItem;
  }
}

export interface GroupingPanelProps {
  /** A component that renders a Grouping panel container. */
  containerComponent: React.ComponentType<GroupingPanel.ContainerProps>;
  /** A component that renders a Grouping panel horizontal layout. */
  horizontalLayoutComponent: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
  /** A component that renders a Grouping panel row. */
  rowComponent: React.ComponentType<GroupingPanel.RowProps>;
  /** A component that renders a Grouping panel cell. */
  cellComponent: React.ComponentType<GroupingPanel.CellProps>;
}
