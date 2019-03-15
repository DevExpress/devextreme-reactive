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
  /** Allow zoom/pan argument */
  allowForArgument?: boolean;
  /** Allow zoom/pan value */
  allowForValue?: boolean;
  /** A component that renders the drag box */
  dragBoxComponent: React.ComponentType<ZoomPan.DragBoxProps>;
}

type RectBox = {x: number, y: number, width: number, height: number};

export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: RectBox;
};

export type LastCoordinates = {x: number, y: number} | null;

// tslint:disable-next-line: no-namespace
export namespace ZoomPan {
  export interface DragBoxProps {
    rectBox: RectBox;
    color: string;
    opacity: number;
  }
}
