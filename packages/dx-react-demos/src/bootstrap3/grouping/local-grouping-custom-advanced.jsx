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
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

const GroupCellTemplate = ({
  style, colSpan, row, isExpanded, toggleGroupExpanded,
}) => (
  <td
    colSpan={colSpan}
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={toggleGroupExpanded}
  >{ isExpanded ? '- ' : '+ ' }
    <strong>Names from {row.value.from} to {row.value.to}</strong>
  </td>
);

GroupCellTemplate.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  row: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
};

GroupCellTemplate.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
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
      rows: generateRows({ length: 14 }),
      grouping: [{ columnName: 'name' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });

    this.getColumnIdentity = (columnName) => {
      if (columnName === 'name') {
        return (value) => {
          const firstLetter = String(value).substr(0, 1).toLowerCase();
          return {
            value: firstLetter < 'n' ? { from: 'A', to: 'M' } : { from: 'N', to: 'Z' },
            key: firstLetter < 'n' ? 'A-M' : 'N-Z',
          };
        };
      }
      return undefined;
    };
  }
  render() {
    const { rows, columns, grouping } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <GroupingState
          grouping={grouping}
          defaultExpandedGroups={['N-Z']}
        />
        <LocalGrouping
          getColumnIdentity={this.getColumnIdentity}
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
