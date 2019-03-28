import {
  ViewportOptions,
  OnViewportChange,
  RectBox,
} from './index';

export interface ZoomAndPanProps {
  /** A default viewport */
  defaultViewport?: ViewportOptions;
  /** A viewport */
  viewport?: ViewportOptions;
  /** A function that is executed when viewport changes */
  onViewportChange?: OnViewportChange;
  /** Interaction with arguments */
  interactionWithArguments?: 'none' | 'pan' | 'zoom' | 'both';
  /** Interaction with values */
  interactionWithValues?: 'none' | 'pan' | 'zoom' | 'both';
  /** A component that renders the drag box */
  dragBoxComponent: React.ComponentType<ZoomAndPan.DragBoxProps>;
  /** Specifies the key that enables panning */
  zoomRegionKey?: 'shift' | 'alt' | 'ctrl';
}

export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: RectBox | null;
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
