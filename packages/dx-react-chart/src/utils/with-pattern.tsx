import * as React from 'react';
import { Pattern } from '../templates/pattern';

// Function is returned (not PureComponent descendant) because
// result is invoked as function (not as React component).
export const withPattern = (getPatternId, props) => Target => (targetProps) => {
  const { color, ...restProps } = targetProps;
  const patternId = getPatternId(restProps);
  return (
    <React.Fragment>
      <Target
        fill={`url(#${patternId})`}
        {...restProps}
      />
      <Pattern
        id={patternId}
        color={color}
        {...props}
      />
    </React.Fragment>
  );
};
