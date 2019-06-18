import * as React from 'react';
import * as PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';

export class TimeTableContainer extends React.PureComponent {
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
    const { setCellElements } = this.props;

    const cellElements = Array.from(this.table.current.querySelectorAll('td'));
    const cellElementsMeta = {
      parentRect: () => this.table.current.getBoundingClientRect(),
      getCellRects: cellElements.map(element => () => element.getBoundingClientRect()),
    };
    setCellElements(cellElementsMeta);
  }

  render() {
    const {
      layoutComponent: Layout,
      cellComponent,
      rowComponent,
      cellsData,
      formatDate,
    } = this.props;

    return (
      <RootRef rootRef={this.table}>
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
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};
