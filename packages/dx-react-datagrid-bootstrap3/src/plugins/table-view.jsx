import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { Layout } from '../templates/layout';

export const TableView = ({ tableCellTemplate, ...props }) => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
      tableNoDataCellTemplate={TableNoDataCell}
      {...props}
    />
    <Layout />
  </PluginContainer>
);
TableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
};
