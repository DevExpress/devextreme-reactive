import React, { useState } from 'react';
import {
  PluginHost, Plugin, Getter, Template, TemplateConnector,
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
    <Getter name="tasks" value={tasks} />
    <Template name="root">
      <ul>
        <TaskIndexer />
      </ul>
    </Template>
  </Plugin>
);

const TaskIndexer = () => (
  <TemplateConnector>
    {({ tasks }) => (tasks.map(({ title, done }, index) => (
      <li
        key={index} // eslint-disable-line react/no-array-index-key
        style={{ textDecoration: done ? 'line-through' : '' }}
      >
        {title}
      </li>
    )))}
  </TemplateConnector>
);
