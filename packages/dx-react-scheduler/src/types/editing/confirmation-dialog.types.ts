import { AppointmentModel } from '../index';
/* tslint:disable no-namespace max-line-length */
export namespace ConfirmationDialog {
  /** Properties passed to a component that renders the dialog's layout. */
  export interface LayoutProps {
    /** 'true' if the appointment is being deleted or 'false' if it is being edited. */
    isDeleting: boolean;
    /** A component that renders the dialog's buttons. */
    buttonComponent: React.ComponentType<ConfirmationDialog.ButtonProps>;
    /** A function that closes the dialog. */
    handleClose: () => void;
    /** A function that confirms changes. */
    confirm: () => void;
    /** Uses a localization message's key to retrieve the message. */
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
  /** Properties passed to a component that renders the dialog's buttons. */
  export interface ButtonProps {
    /** The button's text. */
    title: string;
    /** A function to execute when the button is clicked. */
    onClick: () => void;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** The Discard button's text. */
    discardButton?: string;
    /** The Delete button's text. */
    deleteButton?: string;
    /** The Cancel button's text. */
    cancelButton?: string;
    /** The delete confirmation dialog text. */
    confirmDeleteMeesage?: string;
    /** The cancel confirmation dialog text. */
    confirmCancelMessage?: string;
  }
}

export interface ConfirmationDialogProps {
  /** Specifies whether to open the dialog on delete events. */
  doNotOpenOnDelete: boolean;
  /** Specifies whether to open the dialog on cancel events. */
  doNotOpenOnCancel: boolean;
  /** A component that renders the dialog's layout. */
  layoutComponent: React.ComponentType<ConfirmationDialog.LayoutProps>;
  /** A component that renders the overlay window. */
  overlayComponent: React.ComponentType<ConfirmationDialog.OverlayProps>;
  /** @internal */
  containerComponent: React.ComponentType<ConfirmationDialog.ContainerProps>;
  /** A component that renders the OK and Cancel buttons. */
  buttonComponent: React.ComponentType<ConfirmationDialog.ButtonProps>;
  /** An object that contains localized messages. */
  messages?: ConfirmationDialog.LocalizationMessages;
}

/** @internal */
export type ConfirmationDialogState = {
  isOpen: boolean;
  caller: string;
  actionType: string | undefined;
  appointmentData: AppointmentModel | {};
};
