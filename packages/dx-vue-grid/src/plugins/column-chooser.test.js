import { mount } from '@vue/test-utils';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents } from './test-utils';
import { DxColumnChooser } from './column-chooser';

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
  plugins: ['DxTableColumnVisibility', 'DxToolbar'],
};

const ContainerComponent = { name: 'Container', render() { return <div>{this.$slots.default}</div>; } };
const OverlayComponent = { name: 'Overlay', render() { return <div>{this.$slots.default}</div>; } };
const ToggleButtonComponent = { name: 'ToggleButton', render() { return null; } };
const ItemComponent = { name: 'Item', render() { return null; } };

const defaultProps = {
  containerComponent: ContainerComponent,
  itemComponent: ItemComponent,
  overlayComponent: OverlayComponent,
  toggleButtonComponent: ToggleButtonComponent,
};

describe('DxColumnChooser', () => {
  beforeEach(() => {
    columnChooserItems.mockImplementation(() => [{ column: { name: 'a' }, hidden: true }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass correct parameters to the ContainerComponent', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxColumnChooser
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(ContainerComponent).vm.$slots.default)
      .toHaveLength(1);
  });

  it('should pass correct parameters to the ItemComponent', () => {
    const { $attrs, $listeners } = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxColumnChooser
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    }).find(ItemComponent).vm;

    expect($attrs)
      .toEqual({
        disabled: false,
        item: {
          column: { name: 'a' },
          hidden: true,
        },
      });

    expect($listeners)
      .toEqual({
        toggle: expect.any(Function),
      });
  });

  it('should pass correct parameters to the ItemComponent if toggling is not allowed', () => {
    const { $attrs, $listeners } = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents
              deps={defaultDeps}
              depsOverrides={{
                getter: {
                  isColumnTogglingEnabled: () => false,
                },
              }}
            />
            <DxColumnChooser
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    }).find(ItemComponent).vm;

    expect($attrs)
      .toMatchObject({
        disabled: true,
        item: {
          column: { name: 'a' },
          hidden: true,
        },
      });

    expect($listeners)
      .toEqual({
        toggle: expect.any(Function),
      });
  });

  it('should render OverlayComponent', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxColumnChooser
              {...{ attrs: { ...defaultProps } }}
              containerComponent={{ render: () => null }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(OverlayComponent).exists())
      .toBeTruthy();
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxColumnChooser
              {...{ attrs: { ...defaultProps } }}
              containerComponent={{ render: () => null }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(defaultDeps.getter.columns, defaultDeps.getter.hiddenColumnNames);
  });
});
