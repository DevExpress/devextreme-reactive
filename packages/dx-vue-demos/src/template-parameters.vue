<template>
  <div id="app">
    <PluginHost>
      <Template name="root">
        <ul>
          <TemplatePlaceholder
            v-for="(item, index) in items" :key="index"
            name="item"
            :params="item"
          ></TemplatePlaceholder>
        </ul>
      </Template>
      <Template name="item">
        <template slot-scope="item">
          <li>{{ item }}</li>
        </template>
      </Template>
    </PluginHost>
  </div>
</template>

<script>
import { PluginHost } from './plugged/plugin-host';
import { Template } from './plugged/template';
import { TemplatePlaceholder } from './plugged/template-placeholder';

export default {
  data() {
    return {
      items: [1, 2, 3],
    };
  },
  components: {
    PluginHost,
    Template,
    TemplatePlaceholder,
  }
};
</script>

<style>
</style>
