import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const ENTER_KEY = 13;

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

    this.createTask = (title) => {
      this.setState({
        tasks: [...this.state.tasks, { title, done: false }],
      });
    };
  }
  render() {
    const { tasks } = this.state;

    return (
      <TasksList tasks={tasks}>
        <NewTaskForm onCreate={this.createTask} />
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
TasksList.propTypes = {
  children: PropTypes.node,
};
TasksList.defaultProps = {
  children: null,
};

const TasksListCore = ({ tasks }) => (
  <Plugin>
    <Template name="root">
      <TemplatePlaceholder name="header" />
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
TasksListCore.propTypes = {
  tasks: PropTypes.array.isRequired,
};

const NewTaskForm = ({ onCreate }) => (
  <Plugin>
    <Template name="header">
      <input
        onKeyUp={(e) => {
          const { value } = e.target;
          if (e.keyCode === ENTER_KEY && value) {
            e.target.value = '';
            onCreate(value);
          }
        }}
      />
    </Template>
  </Plugin>
);
NewTaskForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
