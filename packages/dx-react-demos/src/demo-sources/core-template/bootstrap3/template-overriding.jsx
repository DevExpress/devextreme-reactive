import * as React from 'react';
import { PluginHost, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

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

    this.completeTask = (index) => {
      const newTasks = this.state.tasks.slice();
      newTasks[index] = {
        ...newTasks[index],
        done: true,
      };
      this.setState({
        tasks: newTasks,
      });
    };
  }
  render() {
    const { tasks } = this.state;

    return (
      <TasksList tasks={tasks}>
        <TaskCompletion onComplete={this.completeTask} />
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
        {tasks.map((task, index) => (
          <TemplatePlaceholder
            key={index} // eslint-disable-line react/no-array-index-key
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

const TaskCompletion = ({ onComplete }) => (
  <Plugin>
    <Template name="task">
      {({ index, title, done }) => (done ? (
        <TemplatePlaceholder />
      ) : (
        <li>
          {title} <button onClick={() => onComplete(index)}>Complete</button>
        </li>
      ))}
    </Template>
  </Plugin>
);
