import * as React from 'react';

/** @internal */
export class RefHolder extends React.PureComponent {
  elementRef: React.RefObject<Element>;

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
  }

  get rootElement() {
    return this.elementRef.current;
  }

  render() {
    const { children } = this.props;
    return React.isValidElement(children)
      ? React.cloneElement(children, { ref: this.elementRef })
      : React.createElement(
          'div',
          { ref: this.elementRef, style: { display: 'contents' } },
          children,
        );
  }
}
