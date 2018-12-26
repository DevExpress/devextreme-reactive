import * as React from 'react';
import { GetMessageFn } from '@devexpress/dx-core';
import { InlineSummary } from '../../types';

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
