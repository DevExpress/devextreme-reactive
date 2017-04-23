import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const TableHeaderRowGrouping = (props) => {
  const GroupableCell = props.groupableCellTemplate;

  return (
    <div>
      <Template
        name="tableViewCell"
        predicate={({ column, row }) => row.type === 'heading' && !column.type}
        connectActions={(action, { column }) => ({
          groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
        })}
      >
        {({ groupByColumn }) => (
          <GroupableCell groupByColumn={groupByColumn}>
            <TemplatePlaceholder />
          </GroupableCell>
        )}
      </Template>
    </div>
  );
};

TableHeaderRowGrouping.propTypes = {
  groupableCellTemplate: PropTypes.func.isRequired,
};
