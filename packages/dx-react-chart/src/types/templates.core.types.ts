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

/** @internal */
export interface ClipPathProps {
  id: string;
  width: number;
  height: number;
}
