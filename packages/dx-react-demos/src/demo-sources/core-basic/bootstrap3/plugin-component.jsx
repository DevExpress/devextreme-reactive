import * as React from 'react';
import { PluginHost, Plugin, Template } from '@devexpress/dx-react-core';

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
      <TasksList
        tasks={tasks}
      >
        {/* Here we may add other plugins */}
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
    <Template name="root">
      <ul>
        {tasks.map(({ title, done }, index) => (
          <li
            key={index} // eslint-disable-line react/no-array-index-key
            style={{ textDecoration: done ? 'line-through' : '' }}
          >
            {title}
          </li>
        ))}
      </ul>
    </Template>
  </Plugin>
);
