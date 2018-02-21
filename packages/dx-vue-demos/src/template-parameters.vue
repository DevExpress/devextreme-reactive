<template>
  <div>
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
import { PluginHost, Template, TemplatePlaceholder } from '@devexpress/dx-vue-core';

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
