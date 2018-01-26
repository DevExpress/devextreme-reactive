import React from 'react';
import {
  PluginHost,
  Plugin,
  Template,
  TemplatePlaceholder,
  Action,
  TemplateConnector,
} from '@devexpress/dx-react-core';

class Plugin1 extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 11,
    };
    this.increment = () => this.setState(({ count }) => ({ count: count + 1 }));
  }
  render() {
    const { count } = this.state;
    return (
      <Plugin>
        <Action name="increment" action={this.increment} />
        <Template name="root">
          <span>(total count): {count}</span>
        </Template>
      </Plugin>
    );
  }
}

const Plugin2 = () => (
  <Plugin>
    <Template name="root">
      <TemplatePlaceholder />
      <br />
      <TemplateConnector>
        {(getters, { increment }) => (
          <button onClick={increment}>Increment</button>
        )}
      </TemplateConnector>
    </Template>
  </Plugin>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);
