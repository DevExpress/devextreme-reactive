import { TableColumnVisibility as TableColumnVisibilityBase, withComponents } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

export const TableColumnVisibility = withComponents({ EmptyMessage })(TableColumnVisibilityBase);

