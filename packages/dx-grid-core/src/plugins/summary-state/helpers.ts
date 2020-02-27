import { GroupSummaryItem } from '../../types';

export const prepareGroupSummaryItems = (items: GroupSummaryItem[]) => (
  !!items
    ? items.map(item => ({
      ...item,
      showInGroupFooter: (
        item.showInGroupFooter === undefined && !item.alignByColumn
      )
        ? true
        : item.showInGroupFooter,
    }))
    : items
);
