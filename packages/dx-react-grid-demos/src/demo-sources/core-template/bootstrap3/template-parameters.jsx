import React, { useState } from 'react';
import {
  PluginHost, Plugin, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export default () => {
  const [tasks] = useState([
    { title: 'call mom', done: false },
    { title: 'send letters to partners', done: false },
    { title: 'buy milk', done: true },
    { title: 'rent a car', done: false },
  ]);

  return (
    <TasksList tasks={tasks}>
      {/* Here we may add another plugins */}
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
