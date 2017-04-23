import React from 'react';
import { GroupingPanelSorting as GroupingPanelSortingBase } from '@devexpress/dx-react-datagrid';
import { SortableGroupCell } from '../templates/sortable-group-cell';

export const GroupingPanelSorting = props => (
  <GroupingPanelSortingBase
    sortableGroupCellTemplate={SortableGroupCell}
    {...props}
  />
);
