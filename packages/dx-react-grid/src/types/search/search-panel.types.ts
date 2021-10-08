// tslint:disable-next-line: no-namespace
export namespace SearchPanel {
  /** Describes properties passed to a component that renders the Search Panel root element. */
  export interface InputProps {
    /** Specifies the search value. */
    value: string;
    /** Handles the search value changes. */
    onValueChange: (value: string) => void;
    /** Returns a specified localization message. */
    getMessage: (messageKey: string) => string;
    /** @internal */
    inputRef: React.RefObject<HTMLElement>;
  }

  export interface LocalizationMessages {
    /** The search editor placeholder text. */
    searchPlaceholder?: string;
  }
}

export interface SearchPanelProps {
  /** A component that renders the Search Panel input element. */
  inputComponent: React.ComponentType<SearchPanel.InputProps>;
  /** An object that specifies localization messages. */
  messages?: SearchPanel.LocalizationMessages;
}
