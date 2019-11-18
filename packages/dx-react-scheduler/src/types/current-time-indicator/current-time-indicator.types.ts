// tslint:disable-next-line:no-namespace
export namespace CurrentTimeIndicator {
  /** Properties passed to the component that renders the today button. */
  export interface IndicatorProps {
    /** Represents current time. */
    currentTime?: Date;
    /** The start date of the element containing the CurrentTimeIndicator. */
    startDate?: Date;
    /** The end date of the element containing the CurrentTimeIndicator. */
    endDate?: Date;
  }
}

export interface CurrentTimeIndicatorProps {
  /** The time interval in milliseconds between Indicator's position updates. */
  updateInterval: number;
  /** Specifies whether the brightness of past appointments should be reduced. */
  reduceBrightnessOfPastAppointments: boolean;
  /** Specifies whether past cells should be shaded. */
  shadePastCells: boolean;
  /** A component that renders the CurrentTimeIndicator. */
  indicatorComponent: React.ComponentType<CurrentTimeIndicator.IndicatorProps>;
}
