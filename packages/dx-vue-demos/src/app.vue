<template>
  <div id="app">
    <PluginComponent></PluginComponent>
    -------
    <TemplatePlaceholder></TemplatePlaceholder>
    -------
    <TemplateParameters></TemplateParameters>
    -------
    <TemplateOverriding></TemplateOverriding>
  </div>
</template>

<script>
import PluginComponent from './plugin-component';
import TemplatePlaceholder from './template-placeholder';
import TemplateParameters from './template-parameters';
import TemplateOverriding from './template-overriding';

export default {
  components: {
    PluginComponent,
    TemplatePlaceholder,
    TemplateParameters,
    TemplateOverriding,
  }
};
</script>

<style>
</style>
