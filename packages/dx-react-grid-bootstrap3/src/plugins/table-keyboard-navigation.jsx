import { withComponents } from '@devexpress/dx-react-core';
import { TableKeyboardNavigation as TableKeyboardNavigationBase } from '@devexpress/dx-react-grid';
import { FocusCell as Cell } from '../templates/table-focus-cell';
import { FocusRow as Row } from '../templates/table-focus-row';

export const TableKeyboardNavigation = withComponents({ Cell, Row })(TableKeyboardNavigationBase);
