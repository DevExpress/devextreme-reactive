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

export type Interaction = 'none' | 'pan' | 'zoom' | 'both';
