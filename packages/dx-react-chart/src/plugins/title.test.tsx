import * as React from 'react';
import { create } from 'react-test-renderer';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { Title } from './title';

const textComponent = () => null;

const defaultDeps = {
  template: {
    top: {},
  },
};

const defaultProps = {
  textComponent,
  text: 'chart',
  style: 'style',
};

describe('Title', () => {
  it('should render text', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Title
          {...defaultProps}
        />
      </PluginHost>));

    expect(tree.root.findByType(textComponent).props.text)
      .toBe('chart');
  });

  it('should render other template with same name', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Template name="top">
          <h1>
            other template
          </h1>
        </Template>
        <Title
          {...defaultProps}
        />
      </PluginHost>));

    expect(tree.root.findByType(textComponent).props.text)
      .toBe('chart');
    expect(tree.root.findByType('h1').props.children)
      .toBe('other template');
  });
});
