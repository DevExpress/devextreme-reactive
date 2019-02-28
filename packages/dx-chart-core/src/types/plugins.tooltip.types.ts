import { Rect } from './chart-core.types';

export interface TooltipReference {
  readonly clientWidth: number;
  readonly clientHeight: number;
  getBoundingClientRect(): ClientRect;
}
/** @internal */
export type TooltipParameters = {
  readonly element: Rect;
  readonly text: string;
};
