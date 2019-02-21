import { VerticalViewProps } from './view.types';

export interface WeekViewProps extends VerticalViewProps {
  // tslint:disable-next-line: max-line-length
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-bazed day indexes (0 - Sunday). */
  excludedDays?: number[];
  /** Specifies the first day of week. */
  firstDayOfWeek?: number;
}
