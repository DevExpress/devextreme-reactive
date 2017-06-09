import React from 'react';
import { mount } from 'enzyme';
import { format } from 'util';

import { GroupPanelLayout } from './group-panel-layout';

// eslint-disable-next-line react/prop-types
const groupPanelCellTemplate = () => (
  <div
    className="cell"
  />
);

describe('GroupPanelLayout', () => {
  /* eslint-disable no-console */
  const consoleWarn = console.warn;
  const consoleError = console.error;

  const logToError = (...args) => {
    throw new Error(format(...args).replace(/^Error: (?:Warning: )?/, ''));
  };

  beforeEach(() => {
    console.warn = logToError;
    console.error = logToError;
  });

  afterEach(() => {
    console.warn = consoleWarn;
    console.error = consoleError;
  });
  /* eslint-enable no-console */

  it('should render group panel with cells', () => {
    const groupedColumns = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }];
    const tree = mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        allowSorting={false}
        changeSortingDirection={() => {}}
        groupByColumn={() => {}}
        groupByColumnText={''}
        groupPanelCellTemplate={groupPanelCellTemplate}
      />,
    );

    expect(tree.find('.cell').length)
      .toBe(groupedColumns.length);
  });

  it('should render group panel with text when no grouping is specified', () => {
    const groupByColumnText = 'no items';
    const tree = mount(
      <GroupPanelLayout
        groupedColumns={[]}
        allowSorting={false}
        changeSortingDirection={() => {}}
        groupByColumn={() => {}}
        groupByColumnText={groupByColumnText}
        groupPanelCellTemplate={groupPanelCellTemplate}
      />,
    );

    expect(tree.text())
      .toBe(groupByColumnText);
  });

  it('should pass correct sorting parameters to cell template', () => {
    const groupedColumns = [{ name: 'a' }, { name: 'b' }];
    const sorting = [{ columnName: 'a', direction: 'desc' }];
    const cellTemplate = jest.fn().mockImplementation(groupPanelCellTemplate);
    mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        allowSorting
        sorting={sorting}
        changeSortingDirection={() => {}}
        groupByColumn={() => {}}
        groupByColumnText={''}
        groupPanelCellTemplate={cellTemplate}
      />,
    );

    expect(cellTemplate.mock.calls[0][0].sortingDirection)
      .toBe('desc');
    expect(cellTemplate.mock.calls[0][0].allowSorting)
      .toBeTruthy();
    expect(cellTemplate.mock.calls[1][0].sortingDirection)
      .toBeNull();
    expect(cellTemplate.mock.calls[1][0].allowSorting)
      .toBeTruthy();
  });

  it('should pass correct sorting parameters to cell template if sorting is disabled', () => {
    const groupedColumns = [{ name: 'a' }];
    const sorting = [{ columnName: 'a', direction: 'desc' }];
    const cellTemplate = jest.fn().mockImplementation(groupPanelCellTemplate);
    mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        allowSorting={false}
        sorting={sorting}
        changeSortingDirection={() => {}}
        groupByColumn={() => {}}
        groupByColumnText={''}
        groupPanelCellTemplate={cellTemplate}
      />,
    );

    expect(cellTemplate.mock.calls[0][0].sortingDirection)
      .toBe('desc');
    expect(cellTemplate.mock.calls[0][0].allowSorting)
      .toBeFalsy();
  });
});
