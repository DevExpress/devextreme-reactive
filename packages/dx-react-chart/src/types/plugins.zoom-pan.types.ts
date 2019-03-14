import {
  ViewportOptions,
} from './index';

export interface ZoomAndPanProps {
  /** A default viewport */
  defaultViewport?: ViewportOptions;
  /** A viewport */
  viewport?: ViewportOptions;
}

export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: {x: number, y: number, width: number, height: number};
};

export type LastCoordinates = {x: number, y: number} | null;
