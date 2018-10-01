import { withComponents } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell as Cell } from '../templates/table-filter-cell';
import { TableRow as Row } from '../templates/table-row';
import { Editor } from '../templates/filter-row/editor';
import { FilterSelector } from '../templates/filter-row/filter-selector';
import { ToggleButton } from '../templates/filter-row/filter-selector/toggle-button';
import { Icon } from '../templates/filter-row/icon';


export const TableFilterRow = withComponents({
  Row, Cell, Editor, FilterSelector, Icon, ToggleButton,
})(TableFilterRowBase);

TableFilterRow.ROW_TYPE = TableFilterRowBase.ROW_TYPE;
