import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { GroupingPanel } from './grouping-panel';

describe('GroupingPanel', () => {
  const defaultProps = {
    buttonComponent: () => null,
    horizontalLayoutComponent: () => null,
    rowComponent: () => null,
    cellComponent: () => null,
  };
  const defaultDeps = {
    template: {
      groupingPanel: {},
    },
    plugins: ['GroupingState', 'IntegratedGrouping'],
    getter: {
      groups: [],
      viewCellsData: [[{}, {}]],
      currentView: {},
      groupByDate: () => true,
    },
  };

  it('should render groupingPanel Template', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const templatePlaceholder = tree
      .find(Template)
      .filterWhere(node => node.props().name === 'groupingPanel');

    expect(templatePlaceholder.exists())
      .toBeTruthy();

    const horizontalLayoutComponent = tree.find(defaultProps.horizontalLayoutComponent);
    expect(horizontalLayoutComponent.exists())
      .toBeTruthy();
    expect(horizontalLayoutComponent.props())
      .toMatchObject({
        rowComponent: defaultProps.rowComponent,
        cellComponent: defaultProps.cellComponent,
        colSpan: defaultDeps.getter.viewCellsData[0].length,
        groups: defaultDeps.getter.groups,
        showHeaderForEveryDate: true,
      });
  });
});
