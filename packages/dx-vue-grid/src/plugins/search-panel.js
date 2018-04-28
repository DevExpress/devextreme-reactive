import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'Toolbar' },
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
      default: () => { },
    },
  },
  render() {
    const { inputComponent: Input, messages } = this;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="DxSearchPanel"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <div style={{ display: 'flex', flex: 1 }}>
            <TemplatePlaceholder />
            <TemplateConnector>
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
            </TemplateConnector>
          </div>
        </Template>
      </Plugin>
    );
  },
};
