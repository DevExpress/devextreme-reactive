import * as React from 'react';
import {
  PluginHost, Plugin, Getter, Action, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        { title: 'call mom', done: false },
        { title: 'send letters to partners', done: false },
        { title: 'buy milk', done: true },
        { title: 'rent a car', done: false },
      ],
    };
  }

  render() {
    const { tasks } = this.state;

    return (
      <TasksList tasks={tasks}>
        <TasksFilter defaultDone={false} />
        <FilterPanel />
      </TasksList>
    );
  }
}

const TasksList = ({ children, ...restProps }) => (
  <PluginHost>
    <TasksListCore {...restProps} />
    {children}
  </PluginHost>
);

const TasksListCore = ({ tasks }) => (
  <Plugin>
    <Getter name="tasks" value={tasks} />
    <Template name="root">
      <TemplatePlaceholder name="header" />
      <ul>
        <TemplateConnector>
          {({ tasks: processedTasks }) => (processedTasks.map(({ title, done }, index) => (
            <li
              key={index} // eslint-disable-line react/no-array-index-key
              style={{ textDecoration: done ? 'line-through' : '' }}
            >
              {title}
            </li>
          )))}
        </TemplateConnector>
      </ul>
    </Template>
  </Plugin>
);

// eslint-disable-next-line react/no-multi-comp
class TasksFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    const getStateDone = () => {
      const { done } = this.state;
      return done;
    };

    this.state = {
      done: props.defaultDone,
    };

    this.changeFilter = done => this.setState({
      done: done === undefined ? !getStateDone() : done,
    });
  }

  render() {
    const { done } = this.state;
    return (
      <Plugin>
        <Getter
          name="tasks"
          computed={({ tasks }) => tasks.filter(task => done === null || task.done === done)}
        />
        <Getter name="filter" value={done} />
        <Action name="changeFilter" action={this.changeFilter} />
      </Plugin>
    );
  }
}

const FilterPanel = () => (
  <Plugin>
    <Template name="header">
      <TemplateConnector>
        {({ filter }, { changeFilter }) => (
          <div>
            Filter: (
            {JSON.stringify(filter)}
)
            {' '}
            <button
              type="button"
              onClick={() => changeFilter()}
            >
              Change
            </button>
            {' '}
            <button
              type="button"
              onClick={() => changeFilter(null)}
            >
              Clear
            </button>
          </div>
        )}
      </TemplateConnector>
    </Template>
  </Plugin>
);
