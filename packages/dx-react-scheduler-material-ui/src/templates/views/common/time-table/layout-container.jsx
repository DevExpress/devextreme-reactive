import * as React from 'react';
import * as PropTypes from 'prop-types';

export class TimeTableContainer extends React.Component {
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

    const cellElements = tableRef.current.querySelectorAll('td');
    setCellElements(cellElements);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

TimeTableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tableRef: PropTypes.object.isRequired,
  setCellElements: PropTypes.func.isRequired,
};
