import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace EditingMenu {
  export interface LayoutProps {
    isDeleting: boolean;
    buttonComponent: React.ComponentType<EditingMenu.ButtonProps>;
    handleClose: () => void;
    commit: () => void;
    availableOperations: Array<any>;
    /** Returns a specified localization message. */
    getMessage: (messageKey: string) => string;
  }
  export interface ModalProps {
    containerRef: React.RefObject<unknown>;
    open: boolean;
    handleClose: () => void;
  }
  export interface ContainerProps {
    containerRef: React.RefObject<unknown>;
  }
  export interface ButtonProps {
    title: string;
    onClick: () => void;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    current?: string;
    currentAndFollowing?: string;
    all?: string;
    menuTitle?: string;
    closeButton?: string;
    commitButton?: string;
  }
}

export interface EditingMenuProps {
  layoutComponent: React.ComponentType<EditingMenu.LayoutProps>;
  modalComponent: React.ComponentType<EditingMenu.ModalProps>;
  containerComponent: React.ComponentType<EditingMenu.ContainerProps>;
  buttonComponent: React.ComponentType<EditingMenu.ButtonProps>;
  /** An object that specifies localization messages. */
  messages?: EditingMenu.LocalizationMessages;
}

/** @internal */
export type EditingMenuState = {
  isOpen: boolean;
  deletedAppointmentData: Partial<AppointmentModel> | null;
};
