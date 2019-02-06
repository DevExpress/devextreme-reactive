/* globals document:true window:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

export const ThemeColors = React.createContext();

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: undefined,
      borderColor: undefined,
    };
  }

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    const { backgroundColor } = window.getComputedStyle(body);
    // eslint-disable-next-line react/no-find-dom-node
    const borderColor = window.getComputedStyle(findDOMNode(this)).borderBottomColor;
    this.setState({ backgroundColor, borderColor });
  }

  render() {
    const {
      children, className, style, ...restProps
    } = this.props;
    const { backgroundColor, borderColor } = this.state;
    return (
      <ThemeColors.Provider value={{ backgroundColor, borderColor }}>
        <div
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
      </ThemeColors.Provider>
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
