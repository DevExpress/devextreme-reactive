import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import {
  getGroupingInfoFromGroups,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { cellsMeta, getViewCellKey, getViewCellKey as getRowKey } from '../utils';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const renderAllDayCell = (
  Cell, key, startDate, endDate, endOfGroup, hasRightBorder, groupingInfo,
) => (
  <Cell
    key={key}
    startDate={startDate}
    endDate={endDate}
    endOfGroup={endOfGroup}
    hasRightBorder={endOfGroup}
    groupingInfo={groupingInfo}
  />
);

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
      cellComponent,
      rowComponent: Row,
      formatDate,
      groups,
      groupOrientation,
      ...restProps
    } = this.props;

    return (
      <Table
        ref={this.table}
        className={classNames(classes.table, className)}
        {...restProps}
      >
        <TableBody>
          {groupOrientation !== VERTICAL_GROUP_ORIENTATION && (
            <Row>
              {cellsData.map(({
                startDate, endDate, endOfGroup, groupingInfo,
              }) => renderAllDayCell(
                cellComponent, getViewCellKey(startDate, groupingInfo),
                startDate, endDate, endOfGroup, endOfGroup, groupingInfo,
              ))}
            </Row>
          )}
          {groupOrientation === VERTICAL_GROUP_ORIENTATION && (
            groups[groups.length - 1].map((group, index) => {
              const groupingInfo = getGroupingInfoFromGroups(groups, index);
              return (
                <Row key={getRowKey(cellsData[0].startDate, groupingInfo)}>
                  {cellsData.map(({
                    startDate, endDate, endOfGroup,
                  }) => renderAllDayCell(
                    cellComponent, getViewCellKey(startDate, groupingInfo),
                    startDate, endDate, endOfGroup, endOfGroup, groupingInfo,
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
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  groups: undefined,
  className: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
