/* globals window:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { getStickyPosition } from '../utils/css-fallback-properties';

export const StyleContext = React.createContext();

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.panelRef = React.createRef();
    this.state = {
      backgroundColor: undefined,
      borderColor: undefined,
      stickyPosition: undefined,
    };
  }

  componentDidMount() {
    const {
      backgroundColor,
      borderBottomColor: borderColor,
    } = window.getComputedStyle(this.panelRef.current);
    const stickyPosition = getStickyPosition();

    this.setState({ backgroundColor, borderColor, stickyPosition });
  }

  render() {
    const {
      children, className, style, ...restProps
    } = this.props;
    const { backgroundColor, borderColor, stickyPosition } = this.state;

    return (
      <StyleContext.Provider value={{ backgroundColor, borderColor, stickyPosition }}>
        <div
          ref={this.panelRef}
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
};

Root.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
};
