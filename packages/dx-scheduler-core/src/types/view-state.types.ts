export interface ChangeCurrentDatePayload {
  nextDate: Date;
  step: 'day' | 'week' | 'month';
  amount: number;
  direction: string;
}

export interface CurrentView {
  name: string;
  displayName: string;
}
