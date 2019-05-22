/** @internal */
export type DomainBounds = Readonly<[any, any]>;

export type ViewportOptions = {
  readonly argumentStart?: any;
  readonly argumentEnd?: any;
  readonly scaleName?: string;
  readonly valueStart?: any;
  readonly valueEnd?: any;
};

export type OnViewportChangeFn = (viewport: ViewportOptions) => void;

/** @internal */
export type BBox = { left: number, right: number, top: number, bottom: number };
/** @internal */
export type EventCoordinates = { clientX: number, clientY: number };
