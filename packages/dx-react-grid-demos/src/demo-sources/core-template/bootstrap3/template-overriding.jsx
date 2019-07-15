import React, { useState } from 'react';
import {
  PluginHost, Plugin, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export default () => {
  const [tasks, setTasks] = useState([
    { title: 'call mom', done: false },
    { title: 'send letters to partners', done: false },
    { title: 'buy milk', done: true },
    { title: 'rent a car', done: false },
  ]);

  const completeTask = (index) => {
    const newTasks = tasks.slice();
    newTasks[index] = { ...newTasks[index], done: true };
    setTasks(newTasks);
  };

  return (
    <TasksList tasks={tasks}>
      <TaskCompletion onComplete={completeTask} />
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

const TaskCompletion = React.memo(({ onComplete }) => (
  <Plugin>
    <Template name="task">
      {({ index, title, done }) => (done ? (
        <TemplatePlaceholder />
      ) : (
        <li>
          {title}
          {' '}
          <button
            type="button"
            onClick={() => onComplete(index)}
          >
            Complete
          </button>
        </li>
      ))}
    </Template>
  </Plugin>
));
