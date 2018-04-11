import {
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-vue-core';

export const Toolbar = {
  name: 'Toolbar',
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
      <Plugin
        name="Toolbar"
      >
        <Template name="header">
          <Root>
            <TemplatePlaceholder name="toolbarContent" />
          </Root>
          <TemplatePlaceholder />
        </Template>
        <Template name="toolbarContent">
          <FlexibleSpaceComponent />
        </Template>
      </Plugin>
    );
  },
};
