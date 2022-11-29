import * as React from 'react';
import { TableGroupRow } from '../../types';

export const InlineSummaryItem: React.FunctionComponent<
  TableGroupRow.InlineSummaryItemProps
> = React.memo(({
  summary: { messageKey, columnTitle, component: SummaryComponent },
  getMessage,
}) => (
  <React.Fragment>
    {getMessage(messageKey, { columnTitle })}
    <SummaryComponent />
  </React.Fragment>
));
