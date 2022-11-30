import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  defaultFormatlessSummaries, ColumnSummary,
} from '@devexpress/dx-grid-core';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';
import { TableSummaryContentProps, SummaryItemProps } from '../../types';
import { defaultSummaryMessages } from './constants';

export const TableSummaryContent: React.FunctionComponent<TableSummaryContentProps> = ({
  column, columnSummaries, formatlessSummaryTypes,
  itemComponent: Item,
  messages,
}) => {
  const getMessage = getMessagesFormatter({ ...defaultSummaryMessages, ...messages });
  const SummaryItem: React.FunctionComponent<SummaryItemProps> = ({ summary, children }) => (
    <Item
      getMessage={getMessage}
      type={summary.type}
      value={summary.value}
    >
      {children || String(summary.value)}
    </Item>
  );
  const isFormatlessSummary = (summary: ColumnSummary) => (
    summary.value === null
    || formatlessSummaryTypes.includes(summary.type)
    || defaultFormatlessSummaries.includes(summary.type)
  );

  return (
    <React.Fragment>
      {columnSummaries.map((summary) => {
        if (isFormatlessSummary(summary)) {
          return <SummaryItem key={summary.type} summary={summary} />;
        }
        return (
          <TemplatePlaceholder
            key={summary.type}
            name="valueFormatter"
            params={{
              column,
              value: summary.value,
            }}
          >
            {content => (
              <SummaryItem summary={summary}>
                {content}
              </SummaryItem>
            )}
          </TemplatePlaceholder>
        );
      })}
    </React.Fragment>
  );
};
