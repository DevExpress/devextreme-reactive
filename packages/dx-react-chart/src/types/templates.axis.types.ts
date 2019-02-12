export interface LabelProps {
  // The label text
  text: string | number;
  // The x coordinate of the label’s top left corner
  x: number;
  // The y coordinate of the label’s top left corner
  y: number;
  // The label’s baseline
  dominantBaseline: string;
  // The label’s text alignment
  textAnchor: string;
}
export interface LineProps {
  // The line start’s x coordinate
  x1: number;
  // The line end’s x coordinate
  x2: number;
  // The line start’s y coordinate
  y1: number;
  // The line end’s y coordinate
  y2: number;
}

export interface RootProps {
  // The x coordinate of the top left corner of the axis’ rendering area
  dx: number;
  // The y coordinate of the top left corner of the series’ rendering area
  dy: number;
  /** @internal */
  onSizeChange: any;
  // A React node used to render the axis.
  children: React.ReactNode;
}
export type RootState = {
  x: number,
  y: number,
};
