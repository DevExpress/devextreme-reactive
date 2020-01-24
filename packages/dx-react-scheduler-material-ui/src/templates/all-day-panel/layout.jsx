import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { getGroupingInfoFromGroups } from '@devexpress/dx-scheduler-core';
import { cellsMeta, getViewCellKey } from '../utils';

const styles = {
  table: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
  },
};

class LayoutBase extends React.PureComponent {
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
      cellsData,
      classes, className,
      cellComponent: Cell,
      rowComponent: Row,
      formatDate,
      groups,
      ...restProps
    } = this.props;

    return (
      <Table
        ref={this.table}
        className={classNames(classes.table, className)}
        {...restProps}
      >
        <TableBody>
          {!groups && (
            <Row>
              {cellsData.map(({
                startDate, endDate, endOfGroup, groupingInfo,
              }) => (
                <Cell
                  key={getViewCellKey(startDate, groupingInfo)}
                  startDate={startDate}
                  endDate={endDate}
                  endOfGroup={endOfGroup}
                  hasRightBorder={endOfGroup}
                  groupingInfo={groupingInfo}
                />
              ))}
            </Row>
          )}
          {groups && (
            groups[groups.length - 1].map((group, index) => {
              const groupingInfo = getGroupingInfoFromGroups(groups, index);
              return (
                <Row>
                  {cellsData.map(({
                    startDate, endDate, endOfGroup,
                  }) => (
                    <Cell
                      key={startDate.toString()}
                      startDate={startDate}
                      endDate={endDate}
                      endOfGroup={endOfGroup}
                      hasRightBorder={endOfGroup}
                      groupingInfo={groupingInfo}
                    />
                  ))}
                </Row>
              );
            })
          )}
        </TableBody>
      </Table>
    );
  }
}

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  groups: undefined,
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
