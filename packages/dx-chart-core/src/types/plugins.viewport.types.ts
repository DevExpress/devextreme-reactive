export type DomainBounds = Readonly<[any, any]>;

export type ViewportOptions = {
  readonly argumentBounds?: DomainBounds;
  readonly scaleName?: string;
  readonly valueBounds?: DomainBounds;
};
