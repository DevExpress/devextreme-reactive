import * as React from 'react';
import * as PropTypes from 'prop-types';

export class TableNoDataCell extends React.PureComponent {
  render() {
    const {
      style,
      colSpan,
      getMessage,
      tableRow,
      tableColumn,
      ...restProps
    } = this.props;

    return (
      <td
        style={{
          padding: '50px 0',
          ...style,
        }}
        colSpan={colSpan}
        {...restProps}
      >
        <div
          style={{
            display: 'inline-block',
            position: 'fixed',
            left: '50%',
          }}
        >
          <big
            className="text-muted"
            style={{
              display: 'inline-block',
              transform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)',
            }}
          >
            {getMessage('noData')}
          </big>
        </div>
      </td>
    );
  }
}

TableNoDataCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
  tableRow: undefined,
  tableColumn: undefined,
};
