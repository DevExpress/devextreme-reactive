<template>
  <div>
    <PluginHost>
      <Template name="root">
        First template
      </Template>
      <Template name="root">
        <div>
          <TemplatePlaceholder></TemplatePlaceholder>
          <br />
          Second template
        </div>
      </Template>
    </PluginHost>
  </div>
</template>

<script>
import { PluginHost, Template, TemplatePlaceholder } from '@devexpress/dx-vue-core';

export default {
  components: {
    PluginHost,
    Template,
    TemplatePlaceholder,
  }
};
</script>

<style>
</style>
