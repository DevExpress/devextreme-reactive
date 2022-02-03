import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace EditRecurrenceMenu {
  /** Properties passed to a component that renders the edit menu's layout. */
  export interface LayoutProps {
    /** 'true' if the appointment is being deleted or 'false' if it is being edited. */
    isDeleting: boolean;
    /** A component that renders the OK and Cancel buttons. */
    buttonComponent: React.ComponentType<EditRecurrenceMenu.ButtonProps>;
    /** A function that closes the menu. */
    handleClose: () => void;
    /** A function that commits changes. */
    commit: (value?: any) => void;
    /** A list of available editing operations. */
    availableOperations: Array<any>;
    /** A function that returns a message with the specified key. */
    getMessage: (messageKey: string) => string;
  }
  /** Properties passed to a component that renders the overlay window. */
  export interface OverlayProps {
    /** A React component instance or a DOM element that is used to position the window. */
    target: React.RefObject<unknown>;
    /** A flag that specifies whether the overlay window is visible. */
    visible: boolean;
    /** A function that is executed when the window is hidden. */
    onHide: () => void;
  }
  /** @internal */
  export interface ContainerProps {
    /** A React Ref that should be passed into ref property. */
    ref: React.RefObject<unknown>;
  }
  /** Properties passed to a component that renders the OK and Cancel buttons. */
  export interface ButtonProps {
    /** The button's text. */
    title: string;
    /** A function to execute when the button is clicked. */
    onClick: () => void;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** Text for the 'Current appointment' option. */
    current?: string;
    /** Text for the 'Current and following appointments' option. */
    currentAndFollowing?: string;
    /** Text for the 'All appointments' option. */
    all?: string;
    /** The menu's title that should be displayed when an appointment is being edited. */
    menuEditingTitle?: string;
    /** The menu's title that should be displayed when an appointment is being deleted. */
    menuDeletingTitle?: string;
    /** The Cancel button's text. */
    cancelButton?: string;
    /** The OK button's text. */
    commitButton?: string;
  }
}

export interface EditRecurrenceMenuProps {
  /** A component that renders the edit menu's layout. */
  layoutComponent: React.ComponentType<EditRecurrenceMenu.LayoutProps>;
  /** A component that renders the overlay window. */
  overlayComponent: React.ComponentType<EditRecurrenceMenu.OverlayProps>;
  /** @internal */
  containerComponent: React.ComponentType<EditRecurrenceMenu.ContainerProps>;
  /** A component that renders the OK and Cancel buttons. */
  buttonComponent: React.ComponentType<EditRecurrenceMenu.ButtonProps>;
  /** An object that contains localized messages. */
  messages?: EditRecurrenceMenu.LocalizationMessages;
}

/** @internal */
export type EditRecurrenceMenuState = {
  isOpen: boolean;
  deletedAppointmentData: Partial<AppointmentModel> | null;
};
