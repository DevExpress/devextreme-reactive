import { withComponents } from '@devexpress/dx-react-core';
import { TableKeyboardNavigation as TableKeyboardNavigationBase } from '@devexpress/dx-react-grid';
import { FocusCell as Cell } from '../templates/table-focus-cell';

export const TableKeyboardNavigation = withComponents({ Cell })(TableKeyboardNavigationBase);
