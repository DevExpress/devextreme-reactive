import React from 'react';
import PropTypes from 'prop-types';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-datagrid';
import { TableDetailToggle } from '../templates/table-detail-toggle';

export const TableRowDetail = (props) => {
  const { expandedDetails, defaultExpandedDetails, expandedDetailsChange, template } = props;
  return (
    <TableRowDetailBase
      detailToggleTemplate={TableDetailToggle}
      expandedDetails={expandedDetails}
      defaultExpandedDetails={defaultExpandedDetails}
      expandedDetailsChange={expandedDetailsChange}
      template={template}
    />
  );
};

TableRowDetail.propTypes = {
  expandedDetails: PropTypes.array,
  defaultExpandedDetails: PropTypes.array,
  expandedDetailsChange: PropTypes.func,
  template: PropTypes.func.isRequired,
};

TableRowDetail.defaultProps = {
  expandedDetails: undefined,
  defaultExpandedDetails: undefined,
  expandedDetailsChange: undefined,
};
