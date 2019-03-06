/** @internal */
export type DomainBounds = Readonly<[any, any]>;

/** @internal */
export type ViewportOptions = {
  readonly argumentBounds?: DomainBounds;
  readonly scaleName?: string;
  readonly valueBounds?: DomainBounds;
};
