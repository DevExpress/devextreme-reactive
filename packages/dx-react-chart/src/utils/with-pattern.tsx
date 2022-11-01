import * as React from 'react';
import { Pattern } from '../templates/pattern';

// Function is returned (not PureComponent descendant) because
// result is invoked as function (not as React component).
export const withPattern = <T extends any>(
  getPatternId: (props: T) => string, props: T,
) => (Target: React.ComponentType<any>) => (targetProps: any) => {
  const { color, ...restProps } = targetProps;
  const patternId = getPatternId(targetProps);
  return (
    <React.Fragment>
      <Target
        color={`url(#${patternId})`}
        {...restProps}
      />
      <Pattern
        id={patternId}
        color={color}
        {...props as object}
      />
    </React.Fragment>
  );
};
