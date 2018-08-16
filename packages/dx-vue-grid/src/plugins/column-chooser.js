import {
  DxTemplate,
  DxTemplatePlaceholder,
  DxPlugin,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import { columnChooserItems } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxTableColumnVisibility' },
  { name: 'DxToolbar' },
];
export const DxColumnChooser = {
  name: 'DxColumnChooser',
  props: {
    overlayComponent: {
      type: Object,
      required: true,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
    itemComponent: {
      type: Object,
      required: true,
    },
    toggleButtonComponent: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    setButtonRef(button) {
      this.button = button;
    },
    handleToggle() {
      this.visible = !this.visible;
    },
    handleHide() {
      this.visible = false;
    },
  },
  render() {
    const {
      overlayComponent: Overlay,
      containerComponent: Container,
      itemComponent: Item,
      toggleButtonComponent: ToggleButton,
      visible,
    } = this;

    return (
      <DxPlugin
        name="DxColumnChooser"
        dependencies={pluginDependencies}
      >
        <DxTemplate name="toolbarContent">
            <div style={{ display: 'flex', flex: 1 }}>
              <DxTemplatePlaceholder />
              <DxTemplateConnector>
                {({
                  getters: {
                    columns,
                    hiddenColumnNames,
                    isColumnTogglingEnabled,
                  },
                  actions: {
                    toggleColumnVisibility,
                  },
                }) => (
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <ToggleButton
                        buttonRef={this.setButtonRef}
                        onToggle={this.handleToggle}
                        active={visible}
                      />
                      <Overlay
                        visible={visible}
                        target={this.button}
                        onHide={this.handleHide}
                      >
                        <Container>
                          {columnChooserItems(columns, hiddenColumnNames)
                            .map((item) => {
                              const { name: columnName } = item.column;
                              const togglingEnabled = isColumnTogglingEnabled(columnName);
                              return (
                                <Item
                                  key={columnName}
                                  item={item}
                                  disabled={!togglingEnabled}
                                  onToggle={() => toggleColumnVisibility(columnName)}
                                />
                              );
                            })}
                        </Container>
                      </Overlay>
                    </div>
                )}
              </DxTemplateConnector>
            </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
