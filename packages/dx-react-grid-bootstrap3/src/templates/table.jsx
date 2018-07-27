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
    const { backgroundColor: stateBackgroundColor, stickyProp } = this.state;

    let panel = this.node.parentElement;
    while (!panel.classList.contains('panel')) {
      panel = panel.parentElement;
    }
    const { backgroundColor } = window.getComputedStyle(panel);

    if (stateBackgroundColor !== backgroundColor
      || stickyProp !== globalStickyProp) {
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
          marginBottom: 0,
          ...use ? {
            position: stickyProp,
            zIndex: 1,
            background: backgroundColor,
          } : null,
          ...use === 'head' ? {
            top: 0,
          } : null,
          ...use === 'foot' ? {
            top: 0,
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
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

Table.defaultProps = {
  use: undefined,
  style: null,
  className: undefined,
};
