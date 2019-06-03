import * as React from 'react';
import * as PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';

export class TimeTableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.table = null;

    this.saveReference = this.saveReference.bind(this);
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElements } = this.props;

    const cellElements = this.table.querySelectorAll('td');
    setCellElements(cellElements);
  }

  saveReference(ref) {
    const { tableRef } = this.props;
    this.table = ref;
    tableRef(ref);
  }

  render() {
    const { children } = this.props;

    return (
      <RootRef rootRef={this.saveReference}>
        {children}
      </RootRef>
    );
  }
}

TimeTableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tableRef: PropTypes.func.isRequired,
  setCellElements: PropTypes.func.isRequired,
};
