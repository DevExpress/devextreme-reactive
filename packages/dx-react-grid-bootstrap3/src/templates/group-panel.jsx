import React from 'react';
import PropTypes from 'prop-types';

import { GroupPanelCell } from './group-panel-cell';

export const GroupPanel = ({
  groupedColumns, groupByColumnText, groupByColumn,
  getSortingConfig, allowSorting, changeSortingDirection,
}) => {
  const text = () => groupByColumnText ||
    <span>
      Click
      &nbsp;
      <i
        className="glyphicon glyphicon-th-list"
        style={{
          top: '0',
          fontSize: '9px',
        }}
      />
      &nbsp;
      icon in the column header to group by that column
    </span>;

  return groupedColumns.length
    ? (
      <div>
        {
          groupedColumns.map((column) => {
            const { sortingSupported, sortingDirection } = getSortingConfig({ column });

            return (
              <GroupPanelCell
                key={column.name}
                column={column}
                allowSorting={allowSorting && sortingSupported}
                sortingDirection={sortingDirection}
                changeSortingDirection={changeSortingDirection}
                groupByColumn={groupByColumn}
              />
            );
          })
        }
      </div>
    )
    : <span>{text()}</span>;
};

GroupPanel.propTypes = {
  getSortingConfig: PropTypes.any.isRequired,
  allowSorting: PropTypes.bool.isRequired,
  changeSortingDirection: PropTypes.func.isRequired,
  groupedColumns: PropTypes.array.isRequired,
  groupByColumn: PropTypes.func.isRequired,
  groupByColumnText: PropTypes.string,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
