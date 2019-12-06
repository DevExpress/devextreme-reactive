import { ElementRect, CellElementsMeta, FormatterFn, BaseView } from '../index';
import { GroupingItem } from '@devexpress/dx-scheduler-core';

/* tslint:disable no-namespace max-line-length no-empty-interface */
/** @internal */
export interface AllDayPanelState {
  rects: readonly ElementRect[];
  elementsMeta: CellElementsMeta | {};
}

export interface AllDayPanelProps {
  /** A component that renders an All Day panel layout. */
  layoutComponent: React.ComponentType<AllDayPanel.LayoutProps>;
  /** A component that renders an All Day panel cell. */
  cellComponent: React.ComponentType<AllDayPanel.CellProps>;
  /** A component that renders an All Day panel row. */
  rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  /** A component that renders a title cell. */
  titleCellComponent: React.ComponentType<AllDayPanel.TitleCellProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<AllDayPanel.AppointmentLayerProps>;
  /** A component that renders an All Day panel container. */
  containerComponent: React.ComponentType<AllDayPanel.ContainerProps>;
  /** An object that specifies localization messages. */
  messages?: AllDayPanel.LocalizationMessages;
}

export namespace AllDayPanel {
  /** Describes a cell data configuration object. */
  export interface CellData {
    /** The cell’s start time. */
    startDate: Date;
    /** The cell’s end time. */
    endDate: Date;
    /** The cell's group. */
    groupingInfo?: Array<GroupingItem>;
    /** Specifies whether the cell is the last horizontal cell in a given group. */
    isLastHorizontalGroupCell?: boolean;
  }
  /** Describes properties passed to a component that renders an All Day panel layout. */
  export interface LayoutProps {
    /** Cells’ meta data. */
    cellsData: AllDayPanel.CellData[];
    /** A component that renders an All Day panel cell. */
    cellComponent: React.ComponentType<AllDayPanel.CellProps>;
    /** A component that renders an All Day panel row. */
    rowComponent: React.ComponentType<BaseView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** A setCellElementsMeta callback */
    setCellElementsMeta: (cellElementsMeta: CellElementsMeta) => void;
  }
  /** Describes properties passed to a component that renders an All Day panel cell. */
  export interface CellProps {
    /** The cell’s start time. */
    startDate: Date;
    /** The cell’s end time. */
    endDate: Date;
  }
  /** Describes properties passed to a component that renders an All Day panel row. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a title cell. */
  export interface TitleCellProps {
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
  }
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends BaseView.AppointmentLayerProps {}
  /** Describes properties passed to a component that renders an All Day panel container. */
  export interface ContainerProps {
    /** A React node used to render the All Day panel container content. */
    children: React.ReactNode;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** The All Day panel’s title. */
    allDay?: string;
  }
}
