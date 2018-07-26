import {
  DxPluginHost, DxPlugin, DxGetter, DxAction,
  DxTemplate, DxTemplatePlaceholder, DxTemplateConnector,
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
        <TasksFilter defaultDone={false} />
        <FilterPanel />
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
          <div>
            <DxTemplatePlaceholder name="header" />
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
          </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};

const TasksFilter = {
  props: {
    defaultDone: {
      type: Boolean,
    },
  },
  data() {
    return {
      done: this.defaultDone,
    };
  },
  methods: {
    changeFilter() {
      this.done = !this.done;
    },
  },
  render() {
    return (
      <DxPlugin>
        <DxGetter
          name="tasks"
          computed={({
            tasks,
          }) => tasks.filter(task => this.done === null || task.done === this.done)}
        />
        <DxGetter name="filter" value={this.done} />
        <DxAction name="changeFilter" action={this.changeFilter} />
      </DxPlugin>
    );
  },
};

const FilterPanel = {
  render() {
    return (
      <DxPlugin>
        <DxTemplate name="header">
          <DxTemplateConnector>
            {({ getters: { filter }, actions: { changeFilter } }) => (
              <div>
                Filter: ({JSON.stringify(filter)}) <button onClick={changeFilter}>Change</button>
              </div>
            )}
          </DxTemplateConnector>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
