<template>
  <TasksList v-bind:tasks="tasks">
    <!-- Here we may add another plugins -->
  </TasksList>
</template>

<script>
import { PluginHost, Getter, Template, TemplateConnector } from '@devexpress/dx-vue-core';

const TasksList = {
  props: { tasks: {} },
  render() {
    return (
      <PluginHost>
        <TasksListCore tasks={this.tasks} />
        {this.$slots.default}
      </PluginHost>
    );
  },
};

const TasksListCore = {
  components: { Template, Getter },
  props: { tasks: {} },
  render() {
    return (
      <div>
        <Getter name="tasks" value={this.tasks} />
        <Template name="root">
        <div>
      <TemplateConnector>
        {({ getters: { tasks } }) => (
          <ul>
            {tasks.map(({ title, done }, index) => (
              <li
                key={index}
                style={{ textDecoration: done ? 'line-through' : '' }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </TemplateConnector>
      </div>
        </Template>
      </div>
    );
  },
};

const TaskIndexer = {
  components: { TemplateConnector },
  render() {
    return (
      <TemplateConnector>
        {({ getters: { tasks } }) => (
          <ul>
            {tasks.map(({ title, done }, index) => (
              <li
                key={index}
                style={{ textDecoration: done ? 'line-through' : '' }}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </TemplateConnector>
    );
  },
};

export default {
  components: {
    TasksList,
  },
  data() {
    return {
      tasks: [
        { title: 'call mom', done: false },
        { title: 'send letters to partners', done: false },
        { title: 'buy milk', done: true },
        { title: 'rent a car', done: false },
      ],
    }
  },
};
</script>

<style>
</style>
