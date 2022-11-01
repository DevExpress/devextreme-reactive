import * as React from 'react';

/** @internal */
export const RefHolder = React.forwardRef((
  { children }: { children: React.ReactNode },
  ref: React.MutableRefObject<any> | React.RefCallback<any> | null,
) => {
  return React.isValidElement(children) ?
    typeof children.type === 'string'
      ? React.cloneElement(children as React.ReactElement<any>, { ref })
      : React.cloneElement(children as React.ReactElement<any>, { forwardedRef: children.props?.forwardedRef ? (node) => {
        children.props.forwardedRef(node);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      } : ref }) :
    React.createElement(
      'div',
      { ref, style: { display: 'contents' } },
      children,
    );
});
