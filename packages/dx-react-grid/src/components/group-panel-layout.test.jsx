import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';

import { GroupPanelLayout } from './group-panel-layout';

const groupPanelCellTemplate = () => (
  <div
    className="cell"
  />
);
// eslint-disable-next-line react/prop-types
const panelTemplate = ({ cells }) => <div>{cells}</div>;

describe('GroupPanelLayout', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });


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
        panelTemplate={panelTemplate}
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
        panelTemplate={panelTemplate}
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
        panelTemplate={panelTemplate}
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
        panelTemplate={panelTemplate}
      />,
    );

    expect(cellTemplate.mock.calls[0][0].sortingDirection)
      .toBe('desc');
    expect(cellTemplate.mock.calls[0][0].allowSorting)
      .toBeFalsy();
  });
});
