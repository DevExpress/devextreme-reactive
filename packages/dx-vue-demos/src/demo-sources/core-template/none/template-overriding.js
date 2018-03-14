import { PluginHost, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-vue-core';

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
  methods: {
    completeTask(index) {
      this.tasks[index].done = true;
    },
  },
  render() {
    return (
      <TasksList tasks={this.tasks}>
        <TaskCompletion onComplete={this.completeTask} />
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
  props: ['tasks'],
  render() {
    return (
      <Plugin>
        <Template name="root">
          <ul>
            {this.tasks.map((task, index) => (
              <TemplatePlaceholder
                key={index}
                name="task"
                params={{ index, ...task }}
              />
            ))}
          </ul>
        </Template>
        <Template name="task">
          {({ title, done }) => (
            <li
              style={{ textDecoration: done ? 'line-through' : '' }}
            >
              {title}
            </li>
          )}
        </Template>
      </Plugin>
    );
  },
};

const TaskCompletion = {
  render() {
    return (
      <Plugin>
        <Template name="task">
          {({ index, title, done }) => (done ? (
            <TemplatePlaceholder />
          ) : (
            <li>
              {title} <button onClick={() => this.$emit('complete', index)}>Complete</button>
            </li>
          ))}
        </Template>
      </Plugin>
    );
  },
};
