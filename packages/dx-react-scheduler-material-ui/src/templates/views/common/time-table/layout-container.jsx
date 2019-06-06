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
      layoutComponent: Layout,
      cellComponent,
      rowComponent,
      cellsData,
      formatDate,
    } = this.props;

    debugger
    return (
      <RootRef rootRef={tableRef}>
        <Layout
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
  layoutComponent: PropTypes.func.isRequired,
  setCellElements: PropTypes.func.isRequired,
  tableRef: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};
