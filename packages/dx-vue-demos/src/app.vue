<template>
  <div id="app">
    <h2>PluginHost</h2>
    <PluginHostComponent></PluginHostComponent>

    <h2>Plugin</h2>
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

    <h2>SimpleAction</h2>
    <SimpleAction></SimpleAction>

    <h2>ParameterizedAction</h2>
    <ParameterizedAction></ParameterizedAction>
  </div>
</template>

<script>
import PluginHostComponent from './plugin-host-component';
import PluginComponent from './plugin-component';
import TemplatePlaceholder from './template-placeholder';
import TemplateParameters from './template-parameters';
import TemplateOverriding from './template-overriding';
import ValueGetter from './value-getter';
import ComputedGetter from './computed-getter';
import SimpleAction from './simple-action';
import ParameterizedAction from './parameterized-action';

export default {
  components: {
    PluginHostComponent,
    PluginComponent,
    TemplatePlaceholder,
    TemplateParameters,
    TemplateOverriding,
    ValueGetter,
    ComputedGetter,
    SimpleAction,
    ParameterizedAction,
  },
};
</script>

<style>
</style>
