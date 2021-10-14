import * as React from 'react';
import { create } from 'react-test-renderer';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
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
    hiddenColumnNames: ['a'],
    isColumnTogglingEnabled: () => true,
  },
  action: {
    toggleVisibility: () => { },
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['TableColumnVisibility', 'Toolbar'],
};

// eslint-disable-next-line react/prop-types
const ContainerComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
// eslint-disable-next-line react/prop-types
const OverlayComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
const ToggleButtonComponent = () => null;
const ItemComponent = () => null;

const defaultProps = {
  containerComponent: ContainerComponent,
  itemComponent: ItemComponent,
  overlayComponent: OverlayComponent,
  toggleButtonComponent: ToggleButtonComponent,
};

describe('ColumnChooser', () => {
  beforeEach(() => {
    columnChooserItems.mockImplementation(() => [{ column: { name: 'a' }, hidden: true }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass correct parameters to the ContainerComponent', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <ColumnChooser
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(ContainerComponent).props)
      .toEqual({
        children: expect.any(Array),
      });
  });

  it('should pass correct parameters to the ItemComponent', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnChooser
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(ItemComponent).props)
      .toEqual({
        disabled: false,
        item: {
          column: { name: 'a' },
          hidden: true,
        },
        onToggle: expect.any(Function),
      });
  });

  it('should pass correct parameters to the ItemComponent if toggling is not allowed', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnTogglingEnabled: () => false,
          },
        })}
        <ColumnChooser
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(ItemComponent).props)
      .toMatchObject({
        disabled: true,
        item: {
          column: { name: 'a' },
          hidden: true,
        },
        onToggle: expect.any(Function),
      });
  });

  it('should render OverlayComponent', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnChooser
          {...defaultProps}
          containerComponent={() => null}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(OverlayComponent)).not.toBeNull();
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ColumnChooser
          {...defaultProps}
          containerComponent={() => null}
        />
      </PluginHost>
    ));

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(defaultDeps.getter.columns, defaultDeps.getter.hiddenColumnNames);
  });
});
