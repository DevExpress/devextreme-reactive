import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { Layout } from '../templates/layout';

export const VirtualTableView = ({ tableCellTemplate, ...props }) => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={VirtualTable}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
      tableNoDataCellTemplate={TableNoDataCell}
      {...props}
    />
    <Layout />
  </PluginContainer>
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
};
