import * as React from 'react';
import PropTypes from 'prop-types';
import { getStickyPosition } from '../utils/css-fallback-properties';

export class TableNoDataCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stickyPosition: getStickyPosition(),
    };
  }

  componentDidMount() {
    this.setState({ stickyPosition: getStickyPosition() });
  }

  render() {
    const {
      style,
      colSpan,
      getMessage,
      tableRow,
      tableColumn,
      ...restProps
    } = this.props;
    const { stickyPosition } = this.state;

    return (
      <td
        style={{
          padding: '50px 0',
          ...style,
          position: 'static !important',
        }}
        colSpan={colSpan}
        {...restProps}
      >
        <div
          style={{
            display: 'inline-block',
            position: stickyPosition,
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
