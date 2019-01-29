export interface CurrentDatePayload {
  nextDate: Date;
  step: 'day' | 'week' | 'month';
  amount: number;
  direction: string;
}
