import { PluginHost, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-vue-core';

const ENTER_KEY = 13;

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
    createTask(title) {
      this.tasks.push({ title, done: false });
    },
  },
  render() {
    return (
      <TasksList tasks={this.tasks}>
        <NewTaskForm onCreate={this.createTask} />
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
          <div>
            <TemplatePlaceholder name="header" />
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
          </div>
        </Template>
      </Plugin>
    );
  },
};

const NewTaskForm = {
  methods: {
    handleKeyup(e) {
      const { value } = e.target;
      if (e.keyCode === ENTER_KEY && value) {
        e.target.value = '';
        this.$emit('create', value);
      }
    },
  },
  render() {
    return (
      <Plugin>
        <Template name="header">
          <input
            onKeyup={this.handleKeyup}
          />
        </Template>
      </Plugin>
    );
  },
};
