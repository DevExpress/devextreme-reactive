import * as React from 'react';
import { InlineSummary, GetMessageFn } from '../../types';

interface InlineSummaryItemProps {
  getMessage: GetMessageFn;
  summary: InlineSummary;
}

export const InlineSummaryItem: React.SFC<InlineSummaryItemProps> = React.memo(({
  summary: { messageKey, columnTitle, component: SummaryComponent },
  getMessage,
}) => (
  <React.Fragment>
    {getMessage(messageKey, { columnTitle })}
    <SummaryComponent />
  </React.Fragment>
));
