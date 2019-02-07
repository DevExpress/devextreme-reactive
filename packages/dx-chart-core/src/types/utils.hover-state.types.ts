import {
  Target,
} from './chart-core.types';

export type ProcessedTarget = Target | null | undefined;
export type NotifyPointerMoveFn = (target: Target | null) => void;
