import { SummaryType } from '../index';

export interface IntegratedSummaryProps {
  /** A summary calculator. */
  calculator?: (type: SummaryType, rows: Array<any>, getValue: (row: any) => any) => any;
}
