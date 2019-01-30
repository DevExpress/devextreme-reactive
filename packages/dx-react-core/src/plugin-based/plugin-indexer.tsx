import * as React from 'react';
import { PositionContext } from './contexts';

/** @internal */
export const PluginIndexer = ({ children }) => (
  <PositionContext.Consumer>
    {positionContext => (
      React.Children.map(children, (child, index) => {
        if (!child || !child.type) return child;

        const childPosition = () => {
          const calculatedPosition = (positionContext && positionContext()) || [];
          return [...calculatedPosition, index];
        };

        return (
          <PositionContext.Provider value={childPosition}>
            {child}
          </PositionContext.Provider>
        );
      })
    )}
  </PositionContext.Consumer>
);
