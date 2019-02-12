import { ColumnChooserItem } from '../index';

// tslint:disable-next-line:no-namespace
export namespace ColumnChooser {
  /** Describes properties passed to a component that renders a column chooser item. */
  export interface ItemProps {
    /** A column chooser item. */
    item: ColumnChooserItem;
    /** Specifies whether a column chooser item is disabled. */
    disabled: boolean;
    /** Handles an associated column's visibility changes. */
    onToggle(): void;
  }

  /** Describes properties passed to a component that renders the column chooser container. */
  export interface ContainerProps {
    /** A React node used to render column chooser items. */
    children: React.ReactNode;
  }

  /*** Describes properties passed to a component that renders the button
   * that invokes the column chooser. */
  export interface ToggleButtonProps {
    /** An event that initiates overlay showing or hiding. */
    onToggle(): void;
    /*** Returns a specified localization message.
     * Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    getMessage: (messageKey: string) => string;
    /** A function that accepts the button's root React element. */
    buttonRef: (ref: React.ReactInstance) => void;
    active?: boolean;
  }

  /** Describes properties passed to a component that renders the column chooser overlay. */
  export interface OverlayProps {
    /** Specifies whether the overlay is visible. */
    visible: boolean;
    /** A React component instance or a DOM element that is used for overlay positioning. */
    target: React.ReactInstance;
    /** An event that initiates overlay hiding. */
    onHide(): void;
    /** A React node used to render overlay content. */
    children: React.ReactNode;
  }

  export interface LocalizationMessages {
    /*** The toggle button's tooltip text.
     * Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    showColumnChooser?: string;
  }
}

export interface ColumnChooserProps {
  /** A component that renders the column chooser overlay. */
  overlayComponent: React.ComponentType<ColumnChooser.OverlayProps>;
  /** A component that renders a button that invokes the column chooser. */
  toggleButtonComponent: React.ComponentType<ColumnChooser.ToggleButtonProps>;
  /** A component that renders the column chooser container. */
  containerComponent: React.ComponentType<ColumnChooser.ContainerProps>;
  /** A component that renders a column chooser item. */
  itemComponent: React.ComponentType<ColumnChooser.ItemProps>;
  /** An object that specifies localization messages. */
  messages?: ColumnChooser.LocalizationMessages;
}

/** @internal */
export type ColumnChooserState = {
  visible: boolean;
};
