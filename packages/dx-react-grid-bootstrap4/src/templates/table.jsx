/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      backgroundColor: 'white',
    };
  }

  componentDidMount() {
    this.checkStyles();
  }

  checkStyles() {
    const body = document.getElementsByTagName('body')[0];
    const { backgroundColor } = this.state;
    const { backgroundColor: bodyBackgroundColor } = window.getComputedStyle(body);

    if (backgroundColor !== bodyBackgroundColor) {
      this.setState({ backgroundColor: bodyBackgroundColor });
    }
  }

  render() {
    const {
      children, use, style, className, ...restProps
    } = this.props;
    const { backgroundColor } = this.state;
    return (
      <table
        ref={(node) => { this.node = node; }}
        className={classNames({
          'table dx-g-bs4-table': true,
          'dx-g-bs4-table-sticky': !!use,
          'dx-g-bs4-table-head': use === 'head',
          'dx-g-bs4-table-foot': use === 'foot',
        }, className)}
        {...restProps}
        style={{
          ...style,
          ...use ? {
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
  use: PropTypes.oneOf(['head', 'foot']),
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
