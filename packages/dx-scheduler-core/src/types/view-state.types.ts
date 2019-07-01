export interface ChangeCurrentDatePayload {
  nextDate: Date;
  step: 'day' | 'week' | 'month';
  amount: number;
  direction: string;
}
