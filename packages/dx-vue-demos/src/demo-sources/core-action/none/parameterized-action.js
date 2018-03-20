import { PluginHost, Plugin, Getter, Action, Template, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-vue-core';

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
        <TasksFilter defaultDone={false} />
        <FilterPanel />
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
          <div>
            <TemplatePlaceholder name="header" />
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
          </div>
        </Template>
      </Plugin>
    );
  },
};

const TasksFilter = {
  props: { defaultDone: {} },
  data() {
    return {
      done: this.defaultDone,
    };
  },
  methods: {
    changeFilter(done) {
      this.done = done === undefined ? !this.done : done;
    },
  },
  render() {
    return (
      <Plugin>
        <Getter
          name="tasks"
          computed={({ tasks }) =>
            tasks.filter(task => this.done === null || task.done === this.done)}
        />
        <Getter name="filter" value={this.done} />
        <Action name="changeFilter" action={this.changeFilter} />
      </Plugin>
    );
  },
};

const FilterPanel = {
  render() {
    return (
      <Plugin>
        <Template name="header">
          <TemplateConnector>
            {({ getters: { filter }, actions: { changeFilter } }) => (
              <div>
                Filter: ({JSON.stringify(filter)})
                {' '}
                <button onClick={() => changeFilter()}>Change</button>
                {' '}
                <button onClick={() => changeFilter(null)}>Clear</button>
              </div>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  },
};
