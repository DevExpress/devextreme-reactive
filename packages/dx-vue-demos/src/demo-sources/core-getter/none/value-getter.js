import { PluginHost, Plugin, Getter, Template, TemplateConnector } from '@devexpress/dx-vue-core';

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
      <PluginHost>
        <TasksListCore {...{ attrs: this.$attrs }} />
        {this.$slots.default}
      </PluginHost>
    );
  },
};

const TasksListCore = {
  props: { tasks: {} },
  render() {
    return (
      <Plugin>
        <Getter name="tasks" value={this.tasks} />
        <Template name="root">
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
        </Template>
      </Plugin>
    );
  },
};
