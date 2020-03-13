// tslint:disable-next-line: no-namespace
export namespace ExportPanel {
  /*** Describes properties passed to a component that renders the button
   * that invokes the export menu. */
  export interface ToggleButtonProps {
    /** A function that accepts the button's root React element. */
    buttonRef: (ref: React.ReactInstance) => void;
    /** An event that initiates menu showing or hiding. */
    onToggle(): void;
    /*** Returns a specified localization message.
     * Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    getMessage: (messageKey: string) => string;
  }

  /** Describes properties passed to a component that renders the export menu. */
  export interface MenuProps {
    /** Specifies whether the menu is visible. */
    visible: boolean;
    /** A React component instance or a DOM element that is used for menu positioning. */
    target: React.ReactInstance;
    /** An event that initiates menu hiding. */
    onHide(): void;
    /** A React node used to render menu content. */
    children: React.ReactNode;
  }

  export interface MenuItemProps {
    /** A menu item text */
    text: string;
    /** An events that initiates export */
    onClick(): void;
  }

  export interface LocalizationMessages {
    showExportMenu?: string;
    exportAll?: string;
    exportSelected?: string;
  }
}

export interface ExportPanelProps {
  /** A component that renders a button that invokes export menu. */
  toggleButtonComponent: React.ComponentType<ExportPanel.ToggleButtonProps>;
  /** A component that renders the Export Panel menu. */
  menuComponent: React.ComponentType<ExportPanel.MenuProps>;
  /** A component that renders the Export Panel menu item. */
  menuItemComponent: React.ComponentType<ExportPanel.MenuItemProps>;
  /** A function that initiates export. */
  startExport(config?: object): void;
  /** An object that specifies localization messages. */
  messages?: ExportPanel.LocalizationMessages;
}

/** @internal */
export interface ExportPanelState {
  visible: boolean;
}
