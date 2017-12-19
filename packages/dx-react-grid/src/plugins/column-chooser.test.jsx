import React from 'react';
import { shallow, mount } from 'enzyme';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from './test-utils';
import { ColumnChooser } from './column-chooser';

jest.mock('@devexpress/dx-grid-core', () => ({
  columnChooserItems: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ],
    hiddenColumns: ['a'],
  },
  action: {
    toggleVisibility: () => {},
  },
  plugins: ['TableColumnVisibility', 'Toolbar'],
};

const ContainerComponent = () => null;
const ItemComponent = () => null;
const PopoverComponent = () => null;
const ButtonComponent = () => null;

describe('ColumnChooser', () => {
  beforeEach(() => {
    columnChooserItems.mockImplementation(() => [{ column: { name: 'a' }, hidden: true }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render container component with correct parameters', () => {
    const tree = shallow((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TemplatePlaceholder name="toolbarContent" />
        <ColumnChooser
          containerComponent={ContainerComponent}
          itemComponent={ItemComponent}
          popoverComponent={PopoverComponent}
          buttonComponent={ButtonComponent}
        />
      </PluginHost>
    ));

    expect(tree.find(ContainerComponent).props())
      .toEqual({
        item: {
          column: { name: 'a' },
          hidden: true,
        },
        onToggle: expect.any(Function),
      });
  });

  it('should pass correct parameters to the itemComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TemplatePlaceholder name="toolbarContent" />
        <ColumnChooser
          containerComponent={ContainerComponent}
          itemComponent={ItemComponent}
          popoverComponent={PopoverComponent}
          buttonComponent={ButtonComponent}
        />
      </PluginHost>
    ));

    expect(tree.find(ItemComponent).props())
      .toEqual({
        item: {
          column: { name: 'a' },
          hidden: true,
        },
        onToggle: expect.any(Function),
      });
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    const columns = [{ name: 'a' }, { name: 'b' }];
    const hiddenColumns = ['a'];

    shallow((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TemplatePlaceholder name="toolbarContent" />
        <ColumnChooser
          containerComponent={ContainerComponent}
          itemComponent={ItemComponent}
          popoverComponent={PopoverComponent}
          buttonComponent={ButtonComponent}
        />
      </PluginHost>
    ));

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(columns, hiddenColumns);
  });
});
