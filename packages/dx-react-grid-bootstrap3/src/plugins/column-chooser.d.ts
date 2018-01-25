import * as React from 'react';
import {
  ColumnChooserOverlayProps,
  ColumnChooserToggleButtonProps,
  ColumnChooserContainerProps,
  ColumnChooserItemProps,
} from '@devexpress/dx-react-grid';

export interface ColumnChooserProps {
  /** A component that renders the column chooser overlay. */
  overlayComponent?: React.ComponentType<ColumnChooserOverlayProps>;
  /** A component that renders a button that invokes the column chooser. */
  toggleButtonComponent?: React.ComponentType<ColumnChooserToggleButtonProps>;
  /** A component that renders the column chooser container. */
  containerComponent?: React.ComponentType<ColumnChooserContainerProps>;
  /** A component that renders a column chooser item. */
  itemComponent?: React.ComponentType<ColumnChooserItemProps>;
  /** An object that specifies localization messages. */
  messages?: object;
}

interface ColumnChooserComponentType extends React.ComponentClass<ColumnChooserProps> {
  ToggleButton: React.ComponentType<ColumnChooserToggleButtonProps>;
  Overlay:  React.ComponentType<ColumnChooserOverlayProps>;
  Container:  React.ComponentType<ColumnChooserContainerProps>;
  Item: React.ComponentType<ColumnChooserItemProps>;
}

export declare const ColumnChooser: ColumnChooserComponentType;
