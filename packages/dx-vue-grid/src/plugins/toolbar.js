import {
  DxTemplate,
  DxPlugin,
  DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';

export const DxToolbar = {
  name: 'DxToolbar',
  props: {
    rootComponent: {
      type: Object,
      required: true,
    },
    flexibleSpaceComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      rootComponent: Root,
      flexibleSpaceComponent: FlexibleSpaceComponent,
    } = this;
    return (
      <DxPlugin
        name="DxToolbar"
      >
        <DxTemplate name="header">
          <Root>
            <DxTemplatePlaceholder name="toolbarContent" />
          </Root>
          <DxTemplatePlaceholder />
        </DxTemplate>
        <DxTemplate name="toolbarContent">
          <FlexibleSpaceComponent />
        </DxTemplate>
      </DxPlugin>
    );
  },
};
