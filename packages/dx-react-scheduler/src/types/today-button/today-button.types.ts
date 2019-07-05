// tslint:disable-next-line:no-namespace
export namespace TodayButton {
  /** Properties passed to the component that renders the today button. */
  export interface ButtonProps {
    /** Function that sets the Scheduler's current date. */
    setCurrentDate: (nextDate: Date) => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** The today button’s text. */
    today?: string;
  }
}

export interface TodayButtonProps {
  /** A component that renders the today button. */
  buttonComponent: React.ComponentType<TodayButton.ButtonProps>;
  /** An object that specifies localization messages. */
  messages?: TodayButton.LocalizationMessages;
}
