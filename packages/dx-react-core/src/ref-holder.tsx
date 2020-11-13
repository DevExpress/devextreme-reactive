import * as React from 'react';

/** @internal */
export const RefHolder = React.forwardRef((
  { children }: { children: React.ReactNode },
  ref: React.Ref<unknown>,
) => React.isValidElement(children)
    ? React.cloneElement(children, { forwardedRef: ref })
    : React.createElement(
        'div',
        { ref, style: { display: 'contents' } },
        children,
      ),
);
