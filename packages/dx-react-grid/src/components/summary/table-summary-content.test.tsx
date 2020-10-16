import * as React from 'react';
import { mount } from 'enzyme';
import { getMessagesFormatter } from '@devexpress/dx-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { TableSummaryContent } from './table-summary-content';
import { defaultSummaryMessages } from './constants';
import { TableSummaryRow } from '../../types';

jest.mock('@devexpress/dx-core', () => ({
  ...jest.requireActual('@devexpress/dx-core'),
  getMessagesFormatter: jest.fn().mockReturnValue(() => {}),
}));

describe('TableSummaryContent', () => {
  const messages = { min: 'min' };
  const defaultProps = {
    columnSummaries: [
      { type: 'min', value: 2 },
      { type: 'avg', value: 5 },
    ],
    column: { name: 'a' },
    itemComponent: ({ children }: TableSummaryRow.ItemProps) => <span>{children}</span>,
    formatlessSummaryTypes: [],
    messages,
  };
  const assertItemComponentProps = (tree) => {
    expect(tree.find(defaultProps.itemComponent).map(node => node.props()))
      .toEqual([
        {
          type: 'min',
          value: 2,
          getMessage: expect.any(Function),
          children: '2',
        },
        {
          type: 'avg',
          value: 5,
          getMessage: expect.any(Function),
          children: '5',
        },
      ]);
  };

  it('should render formatless summaries by using itemComponent', () => {
    const tree = mount((
      <TableSummaryContent
        {...defaultProps}
        formatlessSummaryTypes={['min', 'avg']}
      />
    ));

    assertItemComponentProps(tree);
  });

  it('should render formatted summaries by using DataTypeProvider', () => {
    const tree = mount((
      <PluginHost>
        <TableSummaryContent {...defaultProps} />
      </PluginHost>
    ));

    const valueFormatters = tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueFormatter');

    expect(valueFormatters.map(node => node.prop('params')))
    .toEqual([
      {
        column: defaultProps.column,
        value: 2,
      },
      {
        column: defaultProps.column,
        value: 5,
      },
    ]);
    assertItemComponentProps(tree);
  });

  it('should provide getMessage function', () => {
    getMessagesFormatter.mockReturnValue(key => key.toUpperCase());
    const tree = mount((
      <TableSummaryContent
        {...defaultProps}
        formatlessSummaryTypes={['min', 'avg']}
        messages={{ min: 'min' }}
      />
    ));

    expect(getMessagesFormatter).toBeCalledWith({ ...defaultSummaryMessages, ...messages });
    const getMessage = tree
      .find(defaultProps.itemComponent).at(0)
      .prop('getMessage');
    expect(getMessage('min'))
      .toBe('MIN');
  });

  it('should consider formatlessSummaryTypes', () => {
    const tree = mount((
      <PluginHost>
        <TableSummaryContent
          {...defaultProps}
          formatlessSummaryTypes={['min']}
          columnSummaries={[...defaultProps.columnSummaries, { type: 'count', value: 10 }]}
        />
      </PluginHost>
    ));

    const valueFormatters = tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueFormatter');

    expect(valueFormatters).toHaveLength(1);
    expect(valueFormatters.at(0).prop('params'))
      .toEqual({
        column: defaultProps.column,
        value: 5,
      });

    expect(tree.find(defaultProps.itemComponent))
      .toHaveLength(3);
  });
});
