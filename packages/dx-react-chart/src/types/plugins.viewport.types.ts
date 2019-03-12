import {
  ViewportOptions,
} from './index';

export interface ViewportProps {
  /** A default viewport */
  defaultViewport?: ViewportOptions;
  /** A viewport */
  viewport?: ViewportOptions;
  /** A function that is executed when viewport changes */
  onViewportChange?: (viewport: ViewportOptions) => void;
}

export type ViewportState = {
  viewport?: ViewportOptions;
};
