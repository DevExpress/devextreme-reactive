<template>
  <div>
    <PluginHost>
      <Template name="root">
        <TemplatePlaceholder name="nested"></TemplatePlaceholder>
      </Template>
      <Template name="nested">
        Hello, from nested template!
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
