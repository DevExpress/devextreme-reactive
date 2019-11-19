import { prepareGroupSummaryItems } from './helpers';

describe('#prepareSummaryGroupItems', () => {
  it('should set showInGroupFooter if it is undefined', () => {
    const item = { columnName: 'a', type: 'sum' };
    const items = [{
        ...item,
      }, {
        ...item,
        showInGroupFooter: true,
      }, {
        ...item,
        showInGroupFooter: false,
      }, {
        ...item,
        showInGroupFooter: false,
        alignByColumn: true,
      },
    ];

    expect(prepareGroupSummaryItems(items))
      .toEqual([
        {
          ...item,
          showInGroupFooter: true,
        }, {
          ...item,
          showInGroupFooter: true,
        }, {
          ...item,
          showInGroupFooter: false,
        }, {
          ...item,
          showInGroupFooter: false,
          alignByColumn: true,
        },
      ]);
  });
});
