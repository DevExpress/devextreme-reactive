import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace EditingMenu {
  /** Properties passed to a component that renders the editing menu's layout. */
  export interface LayoutProps {
    /** The flag that specifies what type of the editing is (deleting or editing). */
    isDeleting: boolean;
    /** A component that renders the editing menu's button. */
    buttonComponent: React.ComponentType<EditingMenu.ButtonProps>;
    /** The function that closed the window. */
    handleClose: () => void;
    /** The function that committed changes. */
    commit: () => void;
    /** The editing operations are available to choose. */
    availableOperations: Array<any>;
    /** Returns a specified localization message. */
    getMessage: (messageKey: string) => string;
  }
  /** Properties passed to a component that renders the editing menu's overlay. */
  export interface OverlayProps {
    /** A React component instance or a DOM element that is used for overlay positioning. */
    target: React.RefObject<unknown>;
    /** Specifies whether the overlay is visible. */
    visible: boolean;
    /** An event that initiates overlay hiding. */
    onHide: () => void;
  }
  /** @internal */
  export interface ContainerProps {
    /** A React Ref that should be passed into ref property. */
    target: React.RefObject<unknown>;
  }
  /** Properties passed to a component that renders the editing menu's button. */
  export interface ButtonProps {
    /** The buttons text. */
    title: string;
    /** The function that should be fired by click. */
    onClick: () => void;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** Specifies the 'current' option's text. */
    current?: string;
    /** Specifies the 'Current and following' option's text. */
    currentAndFollowing?: string;
    /** Specifies the 'All appointments' option's text. */
    all?: string;
    /** Specifies the menu title while editing. */
    menuTitle?: string;
    /** Specifies the cancel button's text. */
    cancelButton?: string;
    /** Specifies the commit button's text. */
    commitButton?: string;
  }
}

export interface EditingMenuProps {
  /** A component that renders the editing menu's layout. */
  layoutComponent: React.ComponentType<EditingMenu.LayoutProps>;
  /** A component that renders the editing menu's overlay. */
  overlayComponent: React.ComponentType<EditingMenu.OverlayProps>;
  /** @internal */
  containerComponent: React.ComponentType<EditingMenu.ContainerProps>;
  /** A component that renders the editing menu's button. */
  buttonComponent: React.ComponentType<EditingMenu.ButtonProps>;
  /** An object that specifies localization messages. */
  messages?: EditingMenu.LocalizationMessages;
}

/** @internal */
export type EditingMenuState = {
  isOpen: boolean;
  deletedAppointmentData: Partial<AppointmentModel> | null;
};
