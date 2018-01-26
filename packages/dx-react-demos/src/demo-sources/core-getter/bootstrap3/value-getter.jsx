import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost, Plugin, Getter, Template, TemplateConnector } from '@devexpress/dx-react-core';

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
        {/* Here we may add another plugins */}
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
    <Getter name="tasks" value={tasks} />
    <Template name="root">
      <ul>
        <TaskIndexer />
      </ul>
    </Template>
  </Plugin>
);
TasksListCore.propTypes = {
  tasks: PropTypes.array.isRequired,
};

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
