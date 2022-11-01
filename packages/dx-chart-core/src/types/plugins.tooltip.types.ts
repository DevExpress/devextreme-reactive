import { Rect } from './chart-core.types';

export interface TooltipReference {
  readonly clientWidth: number;
  readonly clientHeight: number;
  getBoundingClientRect(): Partial<DOMRect>
}
/** @internal */
export type TooltipParameters = {
  readonly element: Rect;
  readonly text: string;
};
