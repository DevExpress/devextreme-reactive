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
  /** Interaction with arguments */
  interactionWithArguments?: 'none' | 'pan' | 'zoom' | 'both';
  /** Interaction with values */
  interactionWithValues?: 'none' | 'pan' | 'zoom' | 'both';
  /** A component that renders the drag box */
  dragBoxComponent: React.ComponentType<ZoomAndPan.DragBoxProps>;
  /** Specifies the key that enables panning */
  panKey?: 'shift' | 'alt' | 'ctrl';
  /** Enables users to zoom the chart by selecting an area with the drag gesture */
  dragToZoom?: boolean;
}

type RectBox = {x: number, y: number, width: number, height: number};

export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: RectBox;
};

export type LastCoordinates = {x: number, y: number} | null;

// tslint:disable-next-line: no-namespace
export namespace ZoomAndPan {
  export interface DragBoxProps {
    rectBox: RectBox;
    color: string;
    opacity: number;
  }
}
