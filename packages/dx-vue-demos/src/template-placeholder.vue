<template>
  <div id="app">
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
import { PluginHost } from './plugged/plugin-host';
import { Template } from './plugged/template';
import { TemplatePlaceholder } from './plugged/template-placeholder';

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
