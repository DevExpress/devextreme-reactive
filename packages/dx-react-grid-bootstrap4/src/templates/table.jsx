/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import './table.css';

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

    const body = document.getElementsByTagName('body')[0];
    const { backgroundColor } = window.getComputedStyle(body);

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
        className={classNames({
          'table mb-0 dx-rg-bs4-overflow-hidden dx-rg-bs4-table': true,
          'dx-rg-bs4-table-head': use === 'head',
        }, className)}
        {...restProps}
        style={{
          ...style,
          ...use === 'head' ? {
            position: stickyProp,
            backgroundColor,
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
  style: PropTypes.object,
  className: PropTypes.string,
};

Table.defaultProps = {
  className: undefined,
  use: undefined,
  style: null,
};
