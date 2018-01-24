import * as React from 'react';
import { Column } from '../grid';

export interface ColumnChooserOverlayProps {
  /** Specifies whether the overlay is visible. */
  visible: boolean;
  /** A React component that is used for overlay positioning. */
  target: React.ReactNode;
  /** An event that initiates overlay hiding. */
  onHide: () => void;
  /** React elements used to render overlay content. */
  children: Array<React.ReactNode>;
}

export interface ColumnChooserToggleButtonProps {
  /** An event that initiates overlay showing or hiding. */
  onToggle: () => void;
  /** Returns a specified localization message. Available in the "@devexpress/dx-react-grid-material-ui" package. */
  getMessage: (messageKey: string) => string;
  /** A function that accepts the button's root React element. */
  buttonRef: (ref: React.ReactNode) => void;
}

export interface ColumnChooserContainerProps {
  /** React elements used to render column chooser items. */
  children: Array<React.ReactNode>;
}

export interface ColumnChooserItemProps {
  /** A column chooser item. */
  item: ColumnChooserItem;
  /** Handles an associated column's visibility changes. */
  onToggle: () => void;
}

export interface ColumnChooserItem {
  /** The grid column associated with the item. */
  column: Column;
  /** Specifies whether the associated column is hidden. */
  hidden: boolean;
}

export interface ColumnChooserProps {
  /** A component that renders the column chooser overlay. */
  overlayComponent: React.ComponentType<ColumnChooserOverlayProps>;
  /** A component that renders a button that invokes the column chooser. */
  toggleButtonComponent: React.ComponentType<ColumnChooserToggleButtonProps>;
  /** A component that renders the column chooser container. */
  containerComponent: React.ComponentType<ColumnChooserContainerProps>;
  /** A component that renders a column chooser item. */
  itemComponent: React.ComponentType<ColumnChooserItemProps>;
  /** An object that specifies [localization messages]. */
  messages: object;
}

export declare const ColumnChooser: React.ComponentType<ColumnChooserProps>;
