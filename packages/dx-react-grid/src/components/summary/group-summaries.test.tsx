import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { TABLE_GROUP_TYPE } from '@devexpress/dx-grid-core';
import { flattenGroupInlineSummaries } from './group-summaries';

describe('#flattenGroupInlineSummaries', () => {
  const key = { key: 'key' };
  const columns = ['a', 'b', 'c', 'd', 'e', 'g']
    .map(name => (
      { name, title: name }),
    );
  const tableRow = {
    ...key,
    type: TABLE_GROUP_TYPE,
    row: { groupedBy: 'g', compoundKey: 'g|key' },
  };
  const groupSummaryItems = [
    { columnName: 'a', type: 'max', showInGroupFooter: true },
    { columnName: 'a', type: 'sum', showInGroupFooter: false },
    { columnName: 'c', type: 'sum', showInGroupFooter: false, alignByColumn: true },
    { columnName: 'd', type: 'min', showInGroupFooter: false },
    { columnName: 'e', type: 'sum', showInGroupFooter: true },
  ];
  const groupSummaryValues = { 'g|key': [13, 53, 19, 7, 101] };

  it('should consider only in-caption summaries', () => {
    const summaries = flattenGroupInlineSummaries(
      columns, tableRow, groupSummaryItems, groupSummaryValues, [],
    );

    expect(summaries)
      .toHaveLength(2);
  });

  it('should provide summary info', () => {
    const summaries = flattenGroupInlineSummaries(
      columns, tableRow, groupSummaryItems, groupSummaryValues, [],
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
        columns, tableRow, groupSummaryItems, groupSummaryValues, [],
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
            column: columns[0],
            value: 53,
          },
          {
            column: columns[3],
            value: 7,
          },
        ]);
    });

    it('should render unformatted summary value', () => {
      const summaries = flattenGroupInlineSummaries(
        columns, tableRow, groupSummaryItems, groupSummaryValues, ['sum', 'min'],
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
