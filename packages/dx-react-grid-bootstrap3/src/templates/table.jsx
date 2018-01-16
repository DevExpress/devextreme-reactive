/* globals document:true window:true */

import React from 'react';
import PropTypes from 'prop-types';

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
    const { children, use, ...restProps } = this.props;
    const { stickyProp, backgroundColor } = this.state;
    return (
      <table
        ref={(node) => { this.node = node; }}
        className="table"
        {...restProps}
        style={{
          ...restProps.style,
          tableLayout: 'fixed',
          overflow: 'hidden',
          ...use === 'head' ? {
            position: stickyProp,
            top: 0,
            zIndex: 1,
            background: backgroundColor,
          } : null,
        }}
      >
        {children}
      </table>
    );
  }
}

Table.propTypes = {
  use: PropTypes.oneOf(['head']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Table.defaultProps = {
  use: undefined,
};
