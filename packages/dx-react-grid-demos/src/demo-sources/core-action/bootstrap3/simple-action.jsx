import React, { useState } from 'react';
import {
  PluginHost, Plugin, Getter, Action, Template, TemplatePlaceholder, TemplateConnector,
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
      <TasksFilter defaultDone={false} />
      <FilterPanel />
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
const TasksFilter = React.memo(({ defaultDone }) => {
  const [done, setDone] = useState(defaultDone);
  const changeFilter = () => setDone(!done);

  return (
    <Plugin>
      <Getter
        name="tasks"
        computed={({ tasks }) => tasks.filter(task => done === null || task.done === done)}
      />
      <Getter name="filter" value={done} />
      <Action name="changeFilter" action={changeFilter} />
    </Plugin>
  );
});

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
              onClick={changeFilter}
            >
              Change
            </button>
          </div>
        )}
      </TemplateConnector>
    </Template>
  </Plugin>
);
