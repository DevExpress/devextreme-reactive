import { withComponents } from '@devexpress/dx-react-core';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

export const TableColumnVisibility = withComponents({ EmptyMessage })(TableColumnVisibilityBase);
