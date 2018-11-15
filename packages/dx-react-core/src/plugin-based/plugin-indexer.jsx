import * as React from 'react';
import * as PropTypes from 'prop-types';
// import { POSITION_CONTEXT } from './constants';
import { PositionContext } from './context';

export const PluginIndexer = ({ children }) => (
  <PositionContext.Consumer>
    {positionContext => (
      <React.Fragment>
        {
          React.Children.map(children, (child, index) => {
            if (!child || !child.type) return child;

            const childPosition = () => {
              const calculatedPosition = (positionContext && positionContext()) || [];
              return [...calculatedPosition, index];
            };

            return (
              <PluginIndexerContext position={childPosition}>
                {child}
              </PluginIndexerContext>
            );
          })
      }
      </React.Fragment>
    )}
  </PositionContext.Consumer>
);

PluginIndexer.propTypes = {
  children: PropTypes.node,
};

PluginIndexer.defaultProps = {
  children: undefined,
};

// PluginIndexer.contextTypes = {
//   [POSITION_CONTEXT]: PropTypes.func,
// };

class PluginIndexerContext extends React.Component {
  // getChildContext() {
  //   const { position } = this.props;
  //   return {
  //     [POSITION_CONTEXT]: position,
  //   };
  // }

  render() {
    const { children, position } = this.props;
    // return children;
    return (
      <PositionContext.Provider value={position}>
        {/* <PositionContext.Provider value={{ [POSITION_CONTEXT]: position }}> */}
        {children}
      </PositionContext.Provider>
    );
  }
}

PluginIndexerContext.propTypes = {
  position: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// PluginIndexerContext.childContextTypes = {
//   [POSITION_CONTEXT]: PropTypes.func,
// };
