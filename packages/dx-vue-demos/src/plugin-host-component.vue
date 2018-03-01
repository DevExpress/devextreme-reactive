<template>
  <div>
    <PluginHost>
      <Template name="root">
        <div>
          Hello, {{text}}!!!
          <button @click="handleClick">Change</button>
        </div>
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
  },
  data() {
    return {
      text: 'test',
    }
  },
  methods: {
    handleClick() {
      this.text = this.text === 'new' ? 'ete' : 'new';
    }
  }
};
</script>

<style>
</style>
