<template>
  <TasksList v-bind:tasks="tasks">
    <!-- Here we may add other plugins -->
  </TasksList>
</template>

<script>
import Vue from 'vue';
import { PluginHost, Plugin, Template } from '@devexpress/dx-vue-core';

const TasksListCore = {
  components: {
    Template,
    Plugin,
  },
  props: ['tasks'],
  render() {
    return (
      <Plugin>
        <Template name="root">
          <ul>
            {this.tasks.map(({ title, done }, index) =>
              <li
                key={index}
                style={{ textDecoration: done ? 'line-through' : '' }}
              >
                {title}
              </li>
            )}
            { /* <li v-for="({ title, done}, index) in tasks">{{title}}</li> */ }
          </ul>
        </Template>
      </Plugin>
    );
  },
};

const TasksList = {
  components: {
    PluginHost,
    TasksListCore,
  },
  props: ['tasks'],
  render() {
    return (
      <PluginHost>
        <TasksListCore tasks={this.tasks} />
      </PluginHost>
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
