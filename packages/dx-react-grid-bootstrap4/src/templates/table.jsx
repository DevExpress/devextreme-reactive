import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { BodyColorContext } from './layout';

export class Table extends React.Component {
  render() {
    const {
      children, use, style, className, ...restProps
    } = this.props;
    const backgroundColor = this.context;

    return (
      <table
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
};

Table.defaultProps = {
  className: undefined,
  use: undefined,
  style: null,
};
