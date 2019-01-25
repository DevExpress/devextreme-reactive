import * as React from 'react';
import * as PropTypes from 'prop-types';

export class ColumnGroup extends React.PureComponent {
  render() {
    const { columns } = this.props;

    return (
      <colgroup>
        {columns.map(({ key, width, preferMinWidth }) => (
          <col
            key={key}
            style={width !== undefined
              ? { [preferMinWidth ? 'minWidth' : 'width']: `${width}px` }
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
