/* globals window:true */
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { getStickyPosition } from '../utils/css-fallback-properties';

export const StyleContext = React.createContext();

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: undefined,
      borderColor: undefined,
      stickyPosition: undefined,
    };
  }

  componentDidMount() {
    const { rootRef } = this.props;
    const {
      backgroundColor,
      borderBottomColor: borderColor,
    } = window.getComputedStyle(rootRef.current);
    const stickyPosition = getStickyPosition();

    this.setState({ backgroundColor, borderColor, stickyPosition });
  }

  render() {
    const {
      children, className, style, rootRef, ...restProps
    } = this.props;
    const { backgroundColor, borderColor, stickyPosition } = this.state;

    return (
      <StyleContext.Provider value={{ backgroundColor, borderColor, stickyPosition }}>
        <div
          ref={rootRef}
          className={classNames('panel panel-default', className)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            ...style,
          }}
          {...restProps}
        >
          {children}
        </div>
      </StyleContext.Provider>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.object,
};

Root.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
  rootRef: undefined,
};
