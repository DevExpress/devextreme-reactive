import React from 'react';
import PropTypes from 'prop-types';

let stickyProp;
const testCSSProp = (property, value, noPrefixes) => {
  const prop = `${property}:`;
  // eslint-disable-next-line no-undef
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
  componentDidMount() {
    stickyProp = testCSSProp('position', 'sticky');
  }
  render() {
    const { children, use, ...restProps } = this.props;
    return (
      <table
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
            background: 'white',
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
