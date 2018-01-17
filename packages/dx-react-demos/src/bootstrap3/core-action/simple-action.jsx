import React from 'react';
import {
  PluginHost,
  PluginContainer,
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
      <PluginContainer>
        <Action name="increment" action={this.increment} />
        <Template name="root">
          <span>(total count): {count}</span>
        </Template>
      </PluginContainer>
    );
  }
}

const Plugin2 = () => (
  <PluginContainer>
    <Template name="root">
      <TemplatePlaceholder />
      <br />
      <TemplateConnector>
        {(getters, { increment }) => (
          <button onClick={increment}>Increment</button>
        )}
      </TemplateConnector>
    </Template>
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);
