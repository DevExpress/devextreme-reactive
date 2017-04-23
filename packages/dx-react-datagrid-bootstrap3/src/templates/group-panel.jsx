import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelCellTemplate = ({ column, groupByColumn, children }) => (
  <button
    type="button"
    className="btn btn-default"
    style={{
      marginRight: '5px',
    }}
  >
    {children}
    <i
      className="glyphicon glyphicon-remove"
      style={{
        marginLeft: '8px',
      }}
      onClick={() => groupByColumn({ columnName: column.name })}
    />
  </button>
);
GroupPanelCellTemplate.propTypes = {
  column: PropTypes.object.isRequired,
  groupByColumn: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export const GroupPanel = (props) => {
  const {
    groupedColumns,
    groupByColumn,
    groupByColumnText,
    cellTemplate,
    cellContentTemplate,
  } = props;

  const text = () => groupByColumnText ||
    <span>
      Click <i className="glyphicon glyphicon-th-list" style={{ margin: '0 8px 0 5px' }} />
      icon in the column header to group by that column
    </span>;

  const GroupPanelCell = cellTemplate;

  return groupedColumns.length
    ? <div>{groupedColumns.map(column => (
      <GroupPanelCell key={column.name} column={column} groupByColumn={groupByColumn}>
        {cellContentTemplate({ column })}
      </GroupPanelCell>
      ))}</div>
    : <span>{text()}</span>;
};

GroupPanel.propTypes = {
  groupedColumns: PropTypes.array.isRequired,
  groupByColumn: PropTypes.func.isRequired,
  groupByColumnText: PropTypes.string,
  cellTemplate: PropTypes.func.isRequired,
  cellContentTemplate: PropTypes.func.isRequired,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
