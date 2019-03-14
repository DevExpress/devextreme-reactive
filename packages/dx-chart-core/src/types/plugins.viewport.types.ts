export type DomainBounds = Readonly<any[]>;

export type ViewportOptions = {
  readonly argumentBounds?: DomainBounds;
  readonly scaleName?: string;
  readonly valueBounds?: DomainBounds;
};

export type Coordinates = {
  readonly x: number,
  readonly y: number,
};
