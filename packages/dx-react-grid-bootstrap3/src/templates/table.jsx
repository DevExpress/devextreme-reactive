import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { RefType } from '@devexpress/dx-react-core';
import { StyleContext } from './layout';
import { getStickyPosition } from '../utils/css-fallback-properties';

export class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      stickyPosition: getStickyPosition(),
    };
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.checkStyles();
  }

  checkStyles() {
    const { stickyPosition } = this.state;
    const realStickyPosition = getStickyPosition();

    if (stickyPosition !== realStickyPosition) {
      this.setState({ stickyPosition: realStickyPosition });
    }
  }

  render() {
    const {
      children, use, style, className, tableRef, ...restProps
    } = this.props;
    const { stickyPosition } = this.state;
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
            position: stickyPosition,
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

Table.contextType = StyleContext;

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
