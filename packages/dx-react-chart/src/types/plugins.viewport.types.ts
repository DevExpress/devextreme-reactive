import {
  DomainBounds,
} from './index';

export interface ViewportProps {
  /** An argument bounds */
  argumentBounds?: DomainBounds;
  /** A scale name */
  scaleName?: string;
  /** A value bounds */
  valueBounds?: DomainBounds;
}
