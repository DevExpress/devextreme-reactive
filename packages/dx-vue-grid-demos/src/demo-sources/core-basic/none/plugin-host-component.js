import { DxPluginHost, DxTemplate } from '@devexpress/dx-vue-core';

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
      <TasksList tasks={this.tasks} />
    );
  },
};

const TasksList = {
  props: ['tasks'],
  render() {
    return (
      <DxPluginHost>
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
      </DxPluginHost>
    );
  },
};
