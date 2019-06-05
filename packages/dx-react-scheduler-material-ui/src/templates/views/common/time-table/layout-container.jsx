import * as React from 'react';
import * as PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';

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
    const { children, tableRef } = this.props;

    return (
      <RootRef rootRef={tableRef}>
        {children}
      </RootRef>
    );
  }
}

TimeTableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tableRef: PropTypes.object.isRequired,
  setCellElements: PropTypes.func.isRequired,
};
