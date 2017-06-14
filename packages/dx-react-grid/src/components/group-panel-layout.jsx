import React from 'react';
import PropTypes from 'prop-types';

import { getColumnSortingDirection } from '@devexpress/dx-grid-core';

const getSortingConfig = (sorting, column) => {
  const result = {
    sortingSupported: !column.type && sorting !== undefined,
  };

  if (result.sortingSupported) {
    result.sortingDirection = getColumnSortingDirection(sorting, column.name);
  }

  return result;
};

export const GroupPanelLayout = ({
  allowSorting, sorting, changeSortingDirection,
  groupedColumns, groupByColumn, groupByColumnText,
  groupPanelCellTemplate,
}) => (
  groupedColumns.length
    ? (
      <div>
        {
          groupedColumns.map((column) => {
            const { sortingSupported, sortingDirection } = getSortingConfig(sorting, column);
            return React.cloneElement(
              groupPanelCellTemplate({
                column,
                allowSorting: allowSorting && sortingSupported,
                sortingDirection,
                changeSortingDirection,
                groupByColumn,
              }),
              { key: column.name },
            );
          })
        }
      </div>
    )
    : <span>{groupByColumnText}</span>
);

GroupPanelLayout.propTypes = {
  allowSorting: PropTypes.bool.isRequired,
  sorting: PropTypes.any,
  changeSortingDirection: PropTypes.func.isRequired,
  groupedColumns: PropTypes.array.isRequired,
  groupByColumn: PropTypes.func.isRequired,
  groupByColumnText: PropTypes.any.isRequired,
  groupPanelCellTemplate: PropTypes.func.isRequired,
};

GroupPanelLayout.defaultProps = {
  sorting: undefined,
};
