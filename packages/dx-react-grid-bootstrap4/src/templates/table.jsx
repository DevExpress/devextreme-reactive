import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { RefType } from '@devexpress/dx-react-core';
import { BodyColorContext } from './layout';

// eslint-disable-next-line react/prefer-stateless-function
export class Table extends React.Component {
  render() {
    const {
      children, use, style, className, tableRef, ...restProps
    } = this.props;
    const backgroundColor = this.context;

    return (
      <table
        ref={tableRef}
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

Table.contextType = BodyColorContext;

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  tableRef: RefType.isRequired,
};

Table.defaultProps = {
  className: undefined,
  use: undefined,
  style: null,
};
