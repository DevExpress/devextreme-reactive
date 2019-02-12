export interface TitleProps {
  // The title text
  text: string;
  // A component that renders the title
  textComponent: React.ComponentType<TitleTextProps>;
  // The title position
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TitleTextProps {
  // The title text
  text: string;
}
