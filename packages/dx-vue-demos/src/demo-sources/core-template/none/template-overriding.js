import { DxPluginHost, DxPlugin, DxTemplate, DxTemplatePlaceholder } from '@devexpress/dx-vue-core';

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
            {this.tasks.map((task, index) => (
              <DxTemplatePlaceholder
                key={index}
                name="task"
                params={{ index, ...task }}
              />
            ))}
          </ul>
        </DxTemplate>
        <DxTemplate name="task">
          {({ title, done }) => (
            <li
              style={{ textDecoration: done ? 'line-through' : '' }}
            >
              {title}
            </li>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};

const TaskCompletion = {
  render() {
    return (
      <DxPlugin>
        <DxTemplate name="task">
          {({ index, title, done }) => (done ? (
            <DxTemplatePlaceholder />
          ) : (
            <li>
              {title} <button onClick={() => this.$emit('complete', index)}>Complete</button>
            </li>
          ))}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
