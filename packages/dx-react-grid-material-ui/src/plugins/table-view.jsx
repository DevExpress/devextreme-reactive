import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { Layout } from '../templates/layout';

const tableTemplate = props => <Table {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;

export const TableView = ({ tableCellTemplate, ...props }) => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={tableTemplate}
      tableCellTemplate={combineTemplates(
        tableCellTemplate,
        defaultCellTemplate,
      )}
      tableNoDataCellTemplate={noDataCellTemplate}
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
