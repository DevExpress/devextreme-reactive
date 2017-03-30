import React from 'react';
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
  expandedDetails: React.PropTypes.array,
  defaultExpandedDetails: React.PropTypes.array,
  expandedDetailsChange: React.PropTypes.func,
  template: React.PropTypes.func.isRequired,
};

TableRowDetail.defaultProps = {
  expandedDetails: undefined,
  defaultExpandedDetails: undefined,
  expandedDetailsChange: undefined,
};
