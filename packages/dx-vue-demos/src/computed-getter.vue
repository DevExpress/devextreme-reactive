<template>
 <TasksList v-bind:tasks="tasks">
    <TasksFilter v-bind:done="false"></TasksFilter>
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
  props: { tasks: {} },
  render() {
    return (
      // <Plugin>
      <div>
        <Getter name="tasks" value={this.tasks} />
        <Template name="root">
          <TemplateConnector>
            {({ getters: { tasks: processedTasks } }) => (
              <ul>
                {processedTasks.map(({ title, done }, index) => (
                  <li
                    key={index}
                    style={{ textDecoration: done ? 'line-through' : '' }}
                  >
                    {title}
                  </li>))}
              </ul>
            )}
          </TemplateConnector>
        </Template>
      </div>
      // </Plugin>
    );
  },
};

const TasksFilter = {
  components: { Getter },
  props: { done: {} },
  render() {
    return (
      // <Plugin>
        <Getter
          name="tasks"
          computed={({ tasks }) => tasks.filter(task => this.done === null || task.done === this.done)}
        />
      // </Plugin>
    );
  },
};

export default {
  components: {
    TasksList,
    TasksFilter,
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
