import {
  ViewportOptions,
} from './index';

export interface ZoomAndPanProps {
  /** A default viewport */
  defaultViewport?: ViewportOptions;
  /** A viewport */
  viewport?: ViewportOptions;
  /** A function that is executed when viewport changes */
  onViewportChange?: (viewport: ViewportOptions) => void;
}

export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: {x: number, y: number, width: number, height: number};
};

export type LastCoordinates = {x: number, y: number} | null;
