import * as React from 'react';
import { PluginPositionFn } from '@devexpress/dx-core';
import { PositionContext } from './contexts';

type MemoizedPluginPositionFn =
  (index: number, positionContext: PluginPositionFn) => PluginPositionFn;

type PluginIndexerProps = {
  children: React.ReactNode;
};

/** @internal */
export class PluginIndexer extends React.PureComponent<PluginIndexerProps> {
  indexes: { [index: number]: PluginPositionFn } = {};
  memoize: MemoizedPluginPositionFn = (index, positionContext) => {
    if (this.indexes[index]) return this.indexes[index];

    const fn: PluginPositionFn = () => {
      const calculatedPosition = positionContext();
      return [...calculatedPosition, index];
    };
    this.indexes[index] = fn;

    return fn;
  }
  render() {
    const { children } = this.props;
    return (
      <PositionContext.Consumer>
        {positionContext => (
          React.Children.map(children, (child: any, index: number) => {
            if (!child || !child.type) return child;
            const childPosition = this.memoize(index, positionContext);

            return (
              <PositionContext.Provider key={String(index)} value={childPosition}>
                {child}
              </PositionContext.Provider>
            );
          })
        )}
      </PositionContext.Consumer>
    );
  }
}
