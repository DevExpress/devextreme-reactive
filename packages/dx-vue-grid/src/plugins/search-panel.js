import {
  DxTemplate,
  DxTemplatePlaceholder,
  DxPlugin,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';

const pluginDependencies = [
  { name: 'DxToolbar' },
  { name: 'DxSearchState' },
];

export const DxSearchPanel = {
  name: 'DxSearchPanel',
  props: {
    inputComponent: {
      type: Object,
      required: true,
    },
    messages: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const { inputComponent: Input, messages } = this;
    const getMessage = getMessagesFormatter(messages);

    return (
      <DxPlugin
        name="DxSearchPanel"
        dependencies={pluginDependencies}
      >
        <DxTemplate name="toolbarContent">
          <div style={{ display: 'flex', flex: 1 }}>
            <DxTemplatePlaceholder />
            <DxTemplateConnector>
              {({
                getters: { searchValue },
                actions: { changeSearchValue },
              }) => (
                <Input
                  value={searchValue}
                  onValueChange={changeSearchValue}
                  getMessage={getMessage}
                />
              )}
            </DxTemplateConnector>
          </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
