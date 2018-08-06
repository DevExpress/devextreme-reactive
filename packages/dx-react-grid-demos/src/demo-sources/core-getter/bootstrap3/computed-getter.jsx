import * as React from 'react';
import {
  PluginHost, Plugin, Getter, Template, TemplateConnector,
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
        <TasksFilter done={false} />
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

const TasksFilter = ({ done }) => (
  <Plugin>
    <Getter
      name="tasks"
      computed={({ tasks }) => tasks.filter(task => done === null || task.done === done)}
    />
  </Plugin>
);
