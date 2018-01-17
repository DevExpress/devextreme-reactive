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
    this.changeCount = diff => this.setState(({ count }) => ({ count: count + diff }));
  }
  render() {
    const { count } = this.state;
    return (
      <PluginContainer>
        <Action name="changeCount" action={this.changeCount} />
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
        {(getters, { changeCount }) => (
          <React.Fragment>
            <button onClick={() => changeCount(1)}>Increment</button>
            <button onClick={() => changeCount(-1)}>Decrement</button>
          </React.Fragment>
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
