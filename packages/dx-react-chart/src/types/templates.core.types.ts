export interface ChartLabelProps {
  // The label text
  children: string | number;
  // The x coordinate of the label’s top left corner
  x: number;
  // The y coordinate of the label’s top left corner
  y: number;
}

/** @internal */
export interface RootLayoutProps {
  children?: React.ReactNode;
  width: number;
  height: number;
  style?: any;
}

/** @internal */
export interface PatternProps {
  size?: number;
  opacity: number;
  id: string;
  color: string;
}
