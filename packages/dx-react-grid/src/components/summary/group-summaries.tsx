import * as React from 'react';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';
import { getGroupInlineSummaries } from '@devexpress/dx-grid-core';
import { GetInlineSummaryComponent, FlattenGroupInlineSummariesFn } from '../../types';

const getInlineSummaryComponent: GetInlineSummaryComponent = (
  column, summary, formatlessSummaries,
) => () => (
  (summary.value === null || formatlessSummaries.includes(summary.type))
    ? <>{summary.value}</>
    : (
      <TemplatePlaceholder
        key={summary.type}
        name="valueFormatter"
        params={{
          column,
          value: summary.value,
        }}
      >
        {content => content}
      </TemplatePlaceholder>
    )
);

export const flattenGroupInlineSummaries: FlattenGroupInlineSummariesFn = (
  columns, tableRow, groupSummaryItems, groupSummaryValues,
  formatlessSummaries,
) => (
  getGroupInlineSummaries(
    groupSummaryItems, columns,
    groupSummaryValues[tableRow.row.compoundKey],
  )
    .map(colSummaries => ([
      ...colSummaries.summaries.map(summary => ({
        ...summary,
        columnTitle: colSummaries.column.title,
        messageKey: `${summary.type}Of`,
        component: getInlineSummaryComponent(
          colSummaries.column, summary, formatlessSummaries,
        ),
      })),
    ]))
    .reduce((acc, summaries) => acc.concat(summaries), [])
);
