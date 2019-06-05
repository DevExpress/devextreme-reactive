import * as React from 'react';
import * as PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';

export class TimeTableContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = null;
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElements, tableRef } = this.props;

    const cellElements = Array.from(tableRef.current.querySelectorAll('td'));
    const cellElementsMeta = {
      parentRect: tableRef.current.getBoundingClientRect(),
      getCellRects: cellElements.map(element => () => element.getBoundingClientRect()),
    };
    setCellElements(cellElementsMeta);
  }

  render() {
    const {
      tableRef,
      timeTableLayout: TimeTable,
      cellComponent,
      rowComponent,
      cellsData,
      formatDate,
    } = this.props;

    debugger
    return (
      <RootRef rootRef={tableRef}>
        <TimeTable
          cellsData={cellsData}
          rowComponent={rowComponent}
          cellComponent={cellComponent}
          formatDate={formatDate}
        />
      </RootRef>
    );
  }
}

TimeTableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tableRef: PropTypes.object.isRequired,
  setCellElements: PropTypes.func.isRequired,
};
