import {
  DxTemplate,
  DxTemplatePlaceholder,
  DxPlugin,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter, columnChooserItems } from '@devexpress/dx-grid-core';

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
    messages: {
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
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
      messages,
      visible,
    } = this;
    const getMessage = getMessagesFormatter(messages);
    return (
      <DxPlugin
        name="DxColumnChooser"
        dependencies={pluginDependencies}
      >
        <DxTemplate name="toolbarContent">
            <div>
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
                    <div>
                      <ToggleButton
                        ref="toggle-button"
                        onToggle={this.handleToggle}
                        getMessage={getMessage}
                        active={visible}
                      />
                      <Overlay
                        visible={visible}
                        target="toggle-button"
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
