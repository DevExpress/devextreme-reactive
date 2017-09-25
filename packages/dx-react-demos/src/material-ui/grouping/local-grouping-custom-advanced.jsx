import React from 'react';
import PropTypes from 'prop-types';
import {
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';

import { TableCell } from 'material-ui';
import {
  generateData,
} from '../../demo-data/generator';

const GroupCellTemplate = ({
  colSpan,
  rowData,
  isExpanded,
  toggleGroupExpanded,
}) => (
  <TableCell
    colSpan={colSpan}
    style={{ cursor: 'pointer' }}
    onClick={toggleGroupExpanded}
  >
    <span>
      { isExpanded ? '- ' : '+ ' }
    </span>
    <strong>
      Names from {rowData.value.from} to {rowData.value.to}
    </strong>
  </TableCell>
);

GroupCellTemplate.propTypes = {
  colSpan: PropTypes.number,
  rowData: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
};

GroupCellTemplate.defaultProps = {
  colSpan: 1,
  rowData: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name', showWhenGrouped: true },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      data: generateData({ length: 14 }),
      grouping: [{ columnName: 'name' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
    this.getGroupValue = (value, grouping) => {
      const { columnName } = grouping;
      const firstLetter = String(value).substr(0, 1).toLowerCase();
      if (columnName === 'name') {
        return firstLetter < 'n' ? { from: 'A', to: 'M' } : { from: 'N', to: 'Z' };
      }
      return value;
    };
    this.getGroupKey = (value, grouping) => {
      if (grouping.columnName === 'name') {
        return `${value.from}-${value.to}`;
      }
      return String(value);
    };
  }

  render() {
    const { data, columns, grouping } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <GroupingState
          grouping={grouping}
          defaultExpandedGroups={['N-Z']}
        />
        <LocalGrouping
          getGroupValue={this.getGroupValue}
          getGroupKey={this.getGroupKey}
        />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow
          groupCellTemplate={(props) => {
            const { column } = props;
            if (column.name === 'name') {
              return <GroupCellTemplate {...props} />;
            }
            return undefined;
          }}
        />
      </Grid>
    );
  }
}
