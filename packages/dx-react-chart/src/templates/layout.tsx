import * as React from 'react';

type RootProps = {
  children?: React.ReactNode,
  width: number,
  height: number,
  style?: any,
};

export class Root extends React.PureComponent<RootProps> {
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
