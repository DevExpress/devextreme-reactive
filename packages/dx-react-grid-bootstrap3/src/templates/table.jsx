/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

let globalStickyProp;
const testCSSProp = (property, value, noPrefixes) => {
  const prop = `${property}:`;
  const el = document.createElement('test');
  const mStyle = el.style;

  if (!noPrefixes) {
    mStyle.cssText = `${prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`) + value};`;
  } else {
    mStyle.cssText = prop + value;
  }
  return mStyle[property];
};

export class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      stickyProp: globalStickyProp,
      backgroundColor: 'white',
    };
  }
  componentDidMount() {
    this.checkStyles();
  }
  checkStyles() {
    globalStickyProp = testCSSProp('position', 'sticky');

    let panel = this.node.parentElement;
    while (!panel.classList.contains('panel')) {
      panel = panel.parentElement;
    }
    const { backgroundColor } = window.getComputedStyle(panel);

    if (this.state.backgroundColor !== backgroundColor
      || this.state.stickyProp !== globalStickyProp) {
      this.setState({ stickyProp: globalStickyProp, backgroundColor });
    }
  }
  render() {
    const {
      children, use, style, className, ...restProps
    } = this.props;
    const { stickyProp, backgroundColor } = this.state;
    return (
      <table
        ref={(node) => { this.node = node; }}
        className={classNames('table', className)}
        style={{
          tableLayout: 'fixed',
          overflow: 'hidden',
          ...use === 'head' ? {
            position: stickyProp,
            top: 0,
            zIndex: 1,
            background: backgroundColor,
          } : null,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </table>
    );
  }
}

Table.propTypes = {
  use: PropTypes.oneOf(['head']),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

Table.defaultProps = {
  use: undefined,
  style: null,
  className: undefined,
};
