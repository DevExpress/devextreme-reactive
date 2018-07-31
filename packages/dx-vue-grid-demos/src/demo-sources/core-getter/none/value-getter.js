import {
  DxPluginHost, DxPlugin, DxGetter, DxTemplate, DxTemplateConnector,
} from '@devexpress/dx-vue-core';

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
  props: {
    tasks: {
      type: Array,
    },
  },
  render() {
    return (
      <DxPlugin>
        <DxGetter name="tasks" value={this.tasks} />
        <DxTemplate name="root">
          <DxTemplateConnector>
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
          </DxTemplateConnector>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
