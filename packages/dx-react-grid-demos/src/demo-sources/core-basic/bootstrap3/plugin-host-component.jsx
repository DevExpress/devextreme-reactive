import React, { useState } from 'react';
import { PluginHost, Template } from '@devexpress/dx-react-core';

export default () => {
  const [tasks] = useState([
    { title: 'call mom', done: false },
    { title: 'send letters to partners', done: false },
    { title: 'buy milk', done: true },
    { title: 'rent a car', done: false },
  ]);

  return (
    <TasksList
      tasks={tasks}
    />
  );
};

const TasksList = ({ tasks }) => (
  <PluginHost>
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
  </PluginHost>
);
