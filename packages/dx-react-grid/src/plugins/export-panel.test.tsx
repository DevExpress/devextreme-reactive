import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { ExportPanel } from './export-panel';

describe('ExportPanel', () => {
  const defaultDeps = {
    template: {
      toolbarContent: {},
    },
    plugins: ['Toolbar'],
  };
  const startExport =  jest.fn();
  const defaultProps = {
    menuComponent: ({ children }) => <div>{children}</div>,
    menuItemComponent: () => null,
    toggleButtonComponent: () => null,
    startExport,
  };

  beforeEach(jest.clearAllMocks);

  it('should render menu', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ExportPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.menuComponent).props())
      .toMatchObject({
        visible: false,
        onHide: expect.any(Function),
        children: expect.any(Array),
      });
  });

  it('should pass correct props to the first menu item', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ExportPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const item = tree.find(defaultProps.menuItemComponent);

    expect(item.prop('text'))
      .toBe('Export all data');

    const onClick = item.prop('onClick');
    onClick();

    expect(startExport).toHaveBeenCalled();
  });

  it('should not render the `export selection` menu item if selection is not set', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ExportPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.menuItemComponent).length)
      .toBe(1);
  });

  it('should pass correct props to the second menu item', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: {
            selection: [0, 1],
          },
        })}
        <ExportPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    const item = tree.find(defaultProps.menuItemComponent).at(1);

    expect(item.prop('text'))
      .toBe('Export selected rows');

    const onClick = item.prop('onClick');
    onClick();

    expect(startExport).toHaveBeenCalledWith({ selectedOnly: true });
  });

  it('should pass correct props to the toggleButtonComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ExportPanel
          {...defaultProps}
          messages={{
            showExportMenu: 'Export grid',
          }}
        />
      </PluginHost>
    ));

    const button = tree.find(defaultProps.toggleButtonComponent);
    const getMessage = button.prop('getMessage');

    expect(getMessage('showExportMenu'))
      .toBe('Export grid');
    expect(button.props())
      .toMatchObject({
        onToggle: expect.any(Function),
        buttonRef: expect.any(Function),
      });
  });
});
