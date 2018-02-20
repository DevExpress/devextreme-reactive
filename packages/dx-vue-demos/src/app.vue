<template>
  <div id="app">
    <PluginComponent></PluginComponent>
    -------
    <TemplatePlaceholder></TemplatePlaceholder>
    -------
    <TemplateParameters></TemplateParameters>
  </div>
</template>

<script>
import PluginComponent from './plugin-component';
import TemplatePlaceholder from './template-placeholder';
import TemplateParameters from './template-parameters';

export default {
  name: 'App',
  components: {
    PluginComponent,
    TemplatePlaceholder,
    TemplateParameters,
  }
};
</script>

<style>
</style>
