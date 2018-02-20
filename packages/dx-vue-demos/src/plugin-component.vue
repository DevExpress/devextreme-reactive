<template>
  <div id="app">
    <PluginHost>
      <Template name="root">
        Hello, vue!!!
      </Template>
    </PluginHost>
  </div>
</template>

<script>
import { PluginHost } from './plugged/plugin-host';
import { Template } from './plugged/template';

export default {
  components: {
    PluginHost,
    Template,
  }
};
</script>

<style>
</style>
