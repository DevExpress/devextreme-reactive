import React, { useState } from 'react';
import {
  PluginHost, Plugin, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const ENTER_KEY = 13;

export default () => {
  const [tasks, setTasks] = useState([
    { title: 'call mom', done: false },
    { title: 'send letters to partners', done: false },
    { title: 'buy milk', done: true },
    { title: 'rent a car', done: false },
  ]);

  const createTask = (title) => {
    setTasks([...tasks, { title, done: false }]);
  };

  return (
    <TasksList tasks={tasks}>
      <NewTaskForm onCreate={createTask} />
    </TasksList>
  );
};

const TasksList = ({ children, ...restProps }) => (
  <PluginHost>
    <TasksListCore {...restProps} />
    {children}
  </PluginHost>
);

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

const NewTaskForm = React.memo(({ onCreate }) => (
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
));
