import * as React from 'react';
import * as PropTypes from 'prop-types';

export class ColumnGroup extends React.PureComponent {
  render() {
    const { columns } = this.props;

    return (
      <colgroup>
        {columns.map(column => (
          <col
            key={column.key}
            style={column.width !== undefined
              ? { width: `${column.width}px` }
              : null}
          />
        ))}
      </colgroup>
    );
  }
}

ColumnGroup.propTypes = {
  columns: PropTypes.array.isRequired,
};
