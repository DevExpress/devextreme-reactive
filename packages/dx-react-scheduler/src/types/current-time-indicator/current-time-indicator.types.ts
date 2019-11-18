// tslint:disable-next-line:no-namespace
export namespace CurrentTimeIndicator {
  /** Properties passed to the component that renders the today button. */
  export interface IndicatorProps {
    /** Top CSS property in percentages of the containing element's height. */
    top?: string;
  }
}

export interface CurrentTimeIndicatorProps {
  /** The time interval in milliseconds between Indicator's position updates. */
  updateInterval: number;
  /** Specifies whether the past appointments should be shaded. */
  shadePastAppointments: boolean;
  /** Specifies whether past cells should be shaded. */
  shadePastCells: boolean;
  /** A component that renders the CurrentTimeIndicator. */
  indicatorComponent: React.ComponentType<CurrentTimeIndicator.IndicatorProps>;
}
