import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './plugin-host';
import { Plugin } from './plugin';
import { Template } from './template';
import { Getter } from './getter';
import { TemplateConnector } from './template-connector';

describe('Getter', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should return value', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Getter name="test" value="arg" />

            <Template name="root">
              <TemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('arg');
  });

  it('can use other getters', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Getter name="dep" value="dep" />
            <Getter
              name="test"
              computed={getters => getters.dep}
            />

            <Template name="root">
              <TemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('dep');
  });

  it('should preserve the order if used after another getter', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Getter name="dep" value="base" />
            <Getter
              name="test"
              computed={getters => getters.dep}
            />

            <Getter name="dep" value="overriden" />

            <Template name="root">
              <TemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('base');
  });

  it('should pass the latest result to the template', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Getter name="dep" value="base" />

            <Template name="root">
              <TemplateConnector>
                {({ getters: { dep } }) => <h1>{dep}</h1>}
              </TemplateConnector>
            </Template>

            <Getter name="dep" value="overriden" />
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('overriden');
  });

  it('can extend getter with same name', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Getter name="test" value="base" />
            <Getter
              name="test"
              computed={getters => `${getters.test}_extended`}
            />

            <Template name="root">
              <TemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('base_extended');
  });

  it('notifies dependencies to update', () => {
    const EncapsulatedPlugin = {
      render() {
        return (
          <Plugin>
            <Template name="root">
              <TemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </Plugin>
        );
      },
    };

    const Test = {
      props: ['text'],
      render() {
        return (
          <PluginHost>
            <EncapsulatedPlugin />

            <Getter name="test" value={this.text} />
          </PluginHost>
        );
      },
    };

    const wrapper = mount({
      data() {
        return { text: 'old' };
      },
      render() {
        return <Test text={this.text} />;
      },
    });
    wrapper.setData({ text: 'new' });
    wrapper.update();

    expect(wrapper.find('h1').text())
      .toBe('new');
  });
});
