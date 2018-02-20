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
