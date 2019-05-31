import {
  ViewportOptions,
  OnViewportChangeFn,
  EventHandlerFn,
  Interaction,
} from './index';

export interface ZoomAndPanProps {
  /** A default viewport */
  defaultViewport?: ViewportOptions;
  /** A viewport */
  viewport?: ViewportOptions;
  /** A function that is executed when viewport changes */
  onViewportChange?: OnViewportChangeFn;
  /** Interaction with arguments */
  interactionWithArguments?: Interaction;
  /** Interaction with values */
  interactionWithValues?: Interaction;
  /** A component that renders the drag box */
  dragBoxComponent: React.ComponentType<ZoomAndPan.DragBoxProps>;
  /** Specifies the key that enables panning */
  zoomRegionKey?: 'shift' | 'alt' | 'ctrl';
}

type Rect = { x: number; y: number; width: number; height: number; };

/** @internal */
export type ZoomAndPanState = {
  viewport?: ViewportOptions;
  rectBox?: Rect | null;
};

// tslint:disable-next-line: no-namespace
export namespace ZoomAndPan {
  export interface DragBoxProps {
    /** The rect’s coordinate */
    rect: Rect;
  }
}

/** @internal */
export type RootRef = React.RefObject<Element>;

/** @internal */
export type ZoomPanProviderProps = {
  rootRef: RootRef,
  onWheel: EventHandlerFn;
  onStart: EventHandlerFn,
  onMove: EventHandlerFn,
  onEnd: EventHandlerFn,
};
