import * as React from 'react';

export interface ToolbarRootProps {
  /** A React element to be placed in the toolbar. */
  children?: React.ReactNode;
}

export interface ToolbarProps {
  /** A component that renders the toolbar root element. */
  rootComponent: React.ComponentType<ToolbarRootProps>;
}

export declare const Toolbar: React.ComponentType<ToolbarProps>;
