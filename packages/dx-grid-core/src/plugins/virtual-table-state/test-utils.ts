import { Interval, VirtualRows } from '../../types';

export const createInterval = (start: number, end: number): Interval => ({ start, end });
export const generateRows = (interval: Interval, type = 'rows') => (
  Array
    .from({ length: interval.end - interval.start })
    .map((_, i) => ({ id: interval.start + i, type }))
);
export const createVirtualRows = (interval: Interval): VirtualRows => ({
  skip: interval.start,
  rows: generateRows(interval),
});
