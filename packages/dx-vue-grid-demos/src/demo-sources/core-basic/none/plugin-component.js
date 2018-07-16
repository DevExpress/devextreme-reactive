import { DxPluginHost, DxPlugin, DxTemplate } from '@devexpress/dx-vue-core';

export default {
  data() {
    return {
      tasks: [
        { title: 'call mom', done: false },
        { title: 'send letters to partners', done: false },
        { title: 'buy milk', done: true },
        { title: 'rent a car', done: false },
      ],
    };
  },
  render() {
    return (
      <TasksList tasks={this.tasks}>
        {/* Here we may add other plugins */}
      </TasksList>
    );
  },
};

const TasksList = {
  render() {
    return (
      <DxPluginHost>
        <TasksListCore {...{ attrs: this.$attrs }} />
        {this.$slots.default}
      </DxPluginHost>
    );
  },
};

const TasksListCore = {
  props: ['tasks'],
  render() {
    return (
      <DxPlugin>
        <DxTemplate name="root">
          <ul>
            {this.tasks.map(({ title, done }, index) => (
              <li
                key={index}
                style={{ textDecoration: done ? 'line-through' : '' }}
              >
                {title}
              </li>
            ))}
          </ul>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
