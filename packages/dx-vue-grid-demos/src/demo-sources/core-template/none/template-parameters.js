import {
  DxPluginHost, DxPlugin, DxTemplate, DxTemplatePlaceholder,
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
        {/* Here we may add another plugins */}
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
                task={task}
              />
            ))}
          </ul>
        </DxTemplate>
        <DxTemplate name="task">
          {({ attrs: { task } }) => (
            <li
              style={{ textDecoration: task.done ? 'line-through' : '' }}
            >
              {task.title}
            </li>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
