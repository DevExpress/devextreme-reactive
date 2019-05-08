import { AllDayCell } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AllDayPanel {
  /** Describes a cell data configuration object. */
  export interface CellData {
    /** The cell’s start time. */
    startDate: Date;
    /** The cell’s end time. */
    endDate: Date;
  }
  /** Describes properties passed to a component that renders an All Day panel layout. */
  export interface LayoutProps {
    /** Cells’ meta data. */
    cellsData: AllDayCell[];
    /** A function that accepts the All Day panel’s root React element. */
    allDayPanelRef: (ref: React.ReactInstance) => void;
    /** A component that renders an All Day panel cell. */
    cellComponent: React.ComponentType<AllDayPanel.CellProps>;
    /** A component that renders an All Day panel row. */
    rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  }
  /** Describes properties passed to a component that renders an All Day panel cell. */
  export interface CellProps {
    /** The cell’s start time. */
    startDate: Date;
    /** The cell’s end time. */
    endDate: Date;
  }
  /** Describes properties passed to a component that renders an All Day panel row. */
  export interface RowProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a title cell. */
  export interface TitleCellProps {
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
  }
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps {
    /** A React node used to render the appointment layer content. */
    children?: React.ReactNode;
  }
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

export interface AllDayPanelState {
  tableRef: HTMLElement | null;
}
