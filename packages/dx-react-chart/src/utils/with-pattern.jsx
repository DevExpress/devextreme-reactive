import * as React from 'react';
import { Pattern } from '../templates/pattern';

export const withPattern = (Target, getPatternId, props) => ({ color, ...restProps }) => {
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
