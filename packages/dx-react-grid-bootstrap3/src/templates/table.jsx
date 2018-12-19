/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { RefType } from '@devexpress/dx-react-core';
import { ThemeColors } from './layout';

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
    };
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.checkStyles();
  }

  checkStyles() {
    globalStickyProp = testCSSProp('position', 'sticky');
    const { stickyProp } = this.state;

    if (stickyProp !== globalStickyProp) {
      this.setState({ stickyProp: globalStickyProp });
    }
  }

  render() {
    const {
      children, use, style, className, tableRef, ...restProps
    } = this.props;
    const { stickyProp } = this.state;
    const { backgroundColor } = this.context;
    return (
      <table
        ref={(ref) => {
          this.tableRef.current = ref;
          tableRef.current = ref;
        }}
        className={classNames('table', className)}
        style={{
          tableLayout: 'fixed',
          borderCollapse: 'separate',
          marginBottom: 0,
          ...use ? {
            position: stickyProp,
            zIndex: 500,
            background: backgroundColor,
          } : null,
          ...use === 'head' ? {
            top: 0,
          } : null,
          ...use === 'foot' ? {
            bottom: 0,
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

Table.contextType = ThemeColors;

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  tableRef: RefType.isRequired,
};

Table.defaultProps = {
  use: undefined,
  style: null,
  className: undefined,
};
