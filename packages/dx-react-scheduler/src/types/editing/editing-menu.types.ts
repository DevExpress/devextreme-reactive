import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace EditingMenu {
  export interface LayoutProps {
    buttonComponent: React.ComponentType<EditingMenu.ButtonProps>;
    handleClose: () => void;
    commit: () => void;
    availableOperations: Array<any>;
  }
  export interface ModalProps {
    containerRef: React.RefObject<unknown>;
    open: boolean;
    onClose: () => void;
    onBackdropClick: () => void;
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
    /** The all day editor’s label text. */
    allDayLabel?: string;
    /** The title editor’s label text. */
    titleLabel?: string;
    /** The start date editor’s label text. */
    startDateLabel?: string;
    /** The end date editor’s label text. */
    endDateLabel?: string;
    /** The commit button’s text. */
    commitCommand?: string;
    /** The cancel button’s text. */
    cancelCommand?: string;
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
