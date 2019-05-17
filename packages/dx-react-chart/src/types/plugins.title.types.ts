// tslint:disable-next-line: no-namespace
export namespace Title {
  /** Describes properties passed to a component that renders the title */
  export interface TextProps {
    /** The title text */
    text: string;
  }
}
export interface TitleProps {
  /** The title text */
  text: string;
  /** A component that renders the title */
  textComponent: React.ComponentType<Title.TextProps>;
  /** The title position */
  position?: 'top' | 'bottom';
}
