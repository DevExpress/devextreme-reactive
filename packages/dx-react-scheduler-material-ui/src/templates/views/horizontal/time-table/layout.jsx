import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table } from '../../common/table';
import { cellsMeta, getViewCellKey } from '../../../utils';

export class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = React.createRef();
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElementsMeta } = this.props;

    const tableElement = this.table.current;
    setCellElementsMeta(cellsMeta(tableElement));
  }

  render() {
    const {
      setCellElementsMeta,
      cellComponent: Cell,
      rowComponent: Row,
      cellsData,
      formatDate,
      ...restProps
    } = this.props;

    return (
      <Table
        ref={this.table}
        cellsNumber={cellsData[0].length}
        {...restProps}
      >
        {cellsData.map(row => (
          <Row key={row[0].startDate.toString()}>
            {row.map(({
              startDate,
              endDate,
              today,
              otherMonth,
              hasRightBorder,
              groupingInfo,
            }) => (
              <Cell
                key={getViewCellKey(startDate, groupingInfo)}
                startDate={startDate}
                endDate={endDate}
                today={today}
                otherMonth={otherMonth}
                formatDate={formatDate}
                hasRightBorder={hasRightBorder}
                groupingInfo={groupingInfo}
              />
            ))}
          </Row>
        ))}
      </Table>
    );
  }
}

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
};
