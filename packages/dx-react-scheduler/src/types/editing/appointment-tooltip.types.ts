import { AppointmentMeta, AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AppointmentTooltip {
  /** Describes properties passed to a component that renders a tooltip layout. */
  export interface LayoutProps {
    /** Specifies the Open button’s visibility. */
    showOpenButton: boolean;
    /** Specifies the Close button’s visibility. */
    showCloseButton: boolean;
    /** Specifies the Delete button’s visibility. */
    showDeleteButton: boolean;
    /** A command button’s identifier list. */
    commandButtonIds: Array<string>;
    /** An event raised when the Open button is clicked. The event handler should open the appointment form. */
    onOpenButtonClick?: () => void;
    /** An event raised when the Open button is clicked. The event handler should delete an appointment. */
    onDeleteButtonClick?: () => void;
    /** The appointment’s displayed metadata. */
    appointmentMeta?: AppointmentMeta;
    /** Specifies the tooltip’s visibility. */
    visible?: boolean;
    /** An event that hides the tooltip. */
    onHide?: () => void;
    /** A component that renders the tooltip header. */
    headerComponent: React.ComponentType<AppointmentTooltip.HeaderProps>;
    /** A component that renders the tooltip content. */
    contentComponent: React.ComponentType<AppointmentTooltip.ContentProps>;
    /** A component that renders a command button. */
    commandButtonComponent: React.ComponentType<AppointmentTooltip.CommandButtonProps>;
  }
  /** Describes properties passed to a component that renders the tooltip header. */
  export interface HeaderProps {
    /** The appointment’s displayed metadata. */
    appointmentData?: AppointmentModel;
    /** A React node used to render the tooltip header. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders the tooltip content. */
  export interface ContentProps {
    /** The appointment’s displayed metadata. */
    appointmentData?: AppointmentModel;
    /** A React node used to render the tooltip content. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a command button. */
  export interface CommandButtonProps {
    /** The command identifier. */
    id?: 'open' | 'delete' | 'close';
    /** An event that executes the command. */
    onExecute?: () => void;
  }
}

export interface AppointmentTooltipProps {
  /** Specifies the Open button’s visibility. */
  showOpenButton?: boolean;
  /** Specifies the Close button’s visibility. */
  showCloseButton?: boolean;
  /** Specifies the Delete button’s visibility. */
  showDeleteButton?: boolean;
  /** Specifies the tooltip’s visibility. */
  visible?: boolean;
  /** The appointment’s displayed metadata. */
  appointmentMeta?: AppointmentMeta;
  /** Handles the tooltip’s visibility chages. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Handles the meta data changes. */
  onAppointmentMetaChange?: (appointmentMeta: AppointmentMeta) => void;
  /** A component that renders the tooltip layout. */
  layoutComponent: React.ComponentType<AppointmentTooltip.LayoutProps>;
  /** A component that renders the header. */
  headerComponent: React.ComponentType<AppointmentTooltip.HeaderProps>;
  /** A component that renders the tooltip content. */
  contentComponent: React.ComponentType<AppointmentTooltip.ContentProps>;
  /** A component that renders a command button. */
  commandButtonComponent: React.ComponentType<AppointmentTooltip.CommandButtonProps>;
}

/** @internal */
export type AppointmentTooltipState = {
  visible: boolean;
  appointmentMeta: AppointmentMeta;
};
