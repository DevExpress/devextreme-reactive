<template>
  <div>
    <PluginHost>
      <Template name="root">
        Hello, vue!!!
      </Template>
    </PluginHost>
  </div>
</template>

<script>
import { PluginHost, Template } from '@devexpress/dx-vue-core';

export default {
  components: {
    PluginHost,
    Template,
  }
};
</script>

<style>
</style>
