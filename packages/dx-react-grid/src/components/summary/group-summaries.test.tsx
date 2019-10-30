import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { TABLE_GROUP_TYPE } from '@devexpress/dx-grid-core';
import { flattenGroupInlineSummaries } from './group-summaries';

describe('#flattenGroupInlineSummaries', () => {
  const key = { key: 'key' };
  const tableColumns = ['a', 'b', 'c', 'd', 'e', 'g']
    .map(name => (
      { column: { name, title: name } }),
    );
  const tableRow = {
    ...key,
    type: TABLE_GROUP_TYPE,
    row: { groupedBy: 'g', compoundKey: 'g|key' },
  };
  const groupSummaryItems = [
    { columnName: 'a', type: 'max' },
    { columnName: 'a', type: 'sum', showInGroupCaption: true },
    { columnName: 'c', type: 'sum', showInGroupRow: true },
    { columnName: 'd', type: 'min', showInGroupCaption: true },
    { columnName: 'e', type: 'sum' },
  ];
  const groupSummaryValues = { 'g|key': [13, 53, 19, 7, 101] };

  it('should consider only in-caption summaries', () => {
    const summaries = flattenGroupInlineSummaries(
      tableColumns, tableRow, groupSummaryItems, groupSummaryValues, [],
    );

    expect(summaries)
      .toHaveLength(2);
  });

  it('should provide summary info', () => {
    const summaries = flattenGroupInlineSummaries(
      tableColumns, tableRow, groupSummaryItems, groupSummaryValues, [],
    );

    expect(summaries[0])
      .toEqual({
        columnTitle: 'a',
        component: expect.any(Function),
        messageKey: 'sumOf',
        type: 'sum',
        value: 53,
      });
    expect(summaries[1])
      .toEqual({
        columnTitle: 'd',
        component: expect.any(Function),
        messageKey: 'minOf',
        type: 'min',
        value: 7,
      });
  });

  describe('inline summary component', () => {
    it('should render formatted summary value', () => {
      const summaries = flattenGroupInlineSummaries(
        tableColumns, tableRow, groupSummaryItems, groupSummaryValues, [],
      );
      const [Summary1, Summary2] = summaries.map(s => s.component);
      const tree = mount((
        <PluginHost>
          <Summary1 />
          <Summary2 />
        </PluginHost>
      ));

      const valueFormatters = tree
        .find('TemplatePlaceholderBase')
        .findWhere(node => node.prop('name') === 'valueFormatter');

      expect(valueFormatters.map(node => node.prop('params')))
        .toEqual([
          {
            column: tableColumns[0].column,
            value: 53,
          },
          {
            column: tableColumns[3].column,
            value: 7,
          },
        ]);
    });

    it('should render unformatted summary value', () => {
      const summaries = flattenGroupInlineSummaries(
        tableColumns, tableRow, groupSummaryItems, groupSummaryValues, ['sum', 'min'],
      );
      const [Summary1, Summary2] = summaries.map(s => s.component);

      expect(mount((
        <span>
          <Summary1 />
        </span>))
      .html())
        .toBe('<span>53</span>');

      expect(mount((
        <span>
          <Summary2 />
        </span>))
      .html())
        .toBe('<span>7</span>');
    });
  });
});
