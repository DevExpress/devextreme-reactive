import React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Template } from './template';
import { TemplatePlaceholder } from './template-placeholder';

describe('TemplatePlaceholder', () => {
  test('template should be rendered in placeholder', () => {
    const tree = mount(
      <PluginHost>
        <Template name="test">
          <h1>Test content</h1>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" />
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  test('placeholder can accept a content render function as a child', () => {
    const tree = mount(
      <PluginHost>
        <Template name="test">
          <span>Test content</span>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => <h1>{content}</h1>}
          </TemplatePlaceholder>
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1 > span').exists()).toBeTruthy();
  });

  test('template should be rendered in placeholder with params', () => {
    const tree = mount(
      <PluginHost>
        <Template name="test">
          {({ text }) => (
            <h1>{text}</h1>
                    )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('param');
  });

  test('template should be updated in placeholder on params change', () => {
    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Template name="test">
            {({ text }) => (
              <h1>{text}</h1>
                        )}
          </Template>
        );
      }
    }

    const Test = ({ param }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: param }} />
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      param: React.PropTypes.string.isRequired,
    };

    const tree = mount(
      <Test param={'text'} />,
    );
    tree.setProps({ param: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  test('template chain should be rendered in placeholder', () => {
    const tree = mount(
      <PluginHost>
        <Template name="test">
          <h1>Test content</h1>
        </Template>

        <Template name="test">
          <div> {/* TODO: Wrapper required for multiple children */}
            <TemplatePlaceholder />
            <h2>Test content</h2>
          </div>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" />
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').exists()).toBeTruthy();
    expect(tree.find('h2').exists()).toBeTruthy();
  });

  test('template chain should be rendered in placeholder with params', () => {
    const tree = mount(
      <PluginHost>
        <Template name="test">
          {({ text }) => (
            <h1>{text}</h1>
                    )}
        </Template>

        <Template name="test">
          {({ text }) => (
            <div> {/* TODO: Wrapper required for multiple children */}
              <TemplatePlaceholder />
              <h2>{text}</h2>
            </div>
                    )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('param');
    expect(tree.find('h2').text()).toBe('param');
  });
});
