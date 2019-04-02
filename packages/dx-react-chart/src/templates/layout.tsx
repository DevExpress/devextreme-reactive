import * as React from 'react';
import { RootLayoutProps } from '../types';

export class Root extends React.PureComponent<RootLayoutProps> {
  render() {
    const {
      children, width, height, style, ...restProps
    } = this.props;

    return (
      <div
        style={{
          ...style,
          height: `${height}px`,
          ...width ? { width: `${width}px` } : null,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
}
