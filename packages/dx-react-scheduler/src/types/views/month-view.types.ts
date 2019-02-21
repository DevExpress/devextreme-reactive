import { VerticalViewProps } from './view.types';
import { WeekViewProps } from './week-view.types';

type MonthViewPropsType =
  Pick<
    VerticalViewProps,
    Exclude<
      keyof VerticalViewProps,
      'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent'
    >
  >
  &
  Pick<WeekViewProps, 'firstDayOfWeek'>;

// tslint:disable-next-line: no-empty-interface
export interface MonthViewProps extends MonthViewPropsType {}
