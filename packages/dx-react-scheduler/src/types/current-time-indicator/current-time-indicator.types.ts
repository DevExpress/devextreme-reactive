// tslint:disable-next-line:no-namespace
export namespace CurrentTimeIndicator {
  /** Properties passed to the component that renders the today button. */
  export interface IndicatorProps {
    // tslint:disable-next-line: max-line-length
    /*** Indicates the distance from the top edge of the containing element (usually, a timetable cell).
     * The distance is a percentage of the element's height.
     * */
    top?: string;
  }
}

export interface CurrentTimeIndicatorProps {
  // tslint:disable-next-line: max-line-length
  /** An interval in milliseconds that specifies how frequently the indicator's position is updated. */
  updateInterval: number;
  /** Specifies whether previous appointments should be shaded. */
  shadePreviousAppointments: boolean;
  /** Specifies whether previous cells should be shaded. */
  shadePreviousCells: boolean;
  /** A component that renders the current time indicator. */
  indicatorComponent: React.ComponentType<CurrentTimeIndicator.IndicatorProps>;
}
