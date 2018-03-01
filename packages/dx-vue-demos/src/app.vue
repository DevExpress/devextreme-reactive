<template>
  <div id="app">
    <h2>PliuginHost</h2>
    <PluginComponent></PluginComponent>

    <h2>TemplatePlaceholder</h2>
    <TemplatePlaceholder></TemplatePlaceholder>

    <h2>TemplateParameters</h2>
    <TemplateParameters></TemplateParameters>

    <h2>TemplateOverriding</h2>
    <TemplateOverriding></TemplateOverriding>

    <h2>ValueGetter</h2>
    <ValueGetter></ValueGetter>

    <h2>ComputedGetter</h2>
    <ComputedGetter></ComputedGetter>
  </div>
</template>

<script>
import PluginComponent from './plugin-component';
import TemplatePlaceholder from './template-placeholder';
import TemplateParameters from './template-parameters';
import TemplateOverriding from './template-overriding';
import ValueGetter from './value-getter';
import ComputedGetter from './computed-getter';

export default {
  components: {
    PluginComponent,
    TemplatePlaceholder,
    TemplateParameters,
    TemplateOverriding,
    ValueGetter,
    ComputedGetter,
  }
};
</script>

<style>
</style>
