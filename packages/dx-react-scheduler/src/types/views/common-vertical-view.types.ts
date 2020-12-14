import { ViewCell } from '../index';
import { WeekViewProps, BaseView } from './index';

/** @internal */
export interface CommonVerticalViewProps extends WeekViewProps {
  /** A function that calculates cells data. */
  viewCellsDataComputed: (cellDuration: number, startDayHour: number, endDayHour: number) => (payload: any) => readonly ViewCell[][];
  /** The view's type */
  type: string;
  /** The properties that passed into layout component */
  layoutProps?: {
    timeScaleComponent: React.ComponentType<BaseView.TimeScaleLayoutProps>,
  };
}
