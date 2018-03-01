import { mount } from '@vue/test-utils';
import { PluginHost } from './plugin-host';
// import { Plugin } from './plugin';
import { Template } from './template';
import { Getter } from './getter';
import { TemplateConnector } from './template-connector';

describe('Getter', () => {
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

  xit('notifies dependencies to update', () => {
    const EncapsulatedPlugin = {
      render() {
        return (
          <Plugin>
            <Template name="root">
              <TemplateConnector>
                {({ test }) => <h1>{test}</h1>}
              </TemplateConnector>
            </Template>
          </Plugin>
        );
      },
    };

    const Test = {
      props: { text: {} },
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
      render() {
        return <Test text="extended" />;
      },
    });
    wrapper.setProps({ text: 'new' });

    expect(wrapper.find('h1').text()).toBe('new');
  });

  // This test is not correct enough. Rewrite it in future
  xit('should be memoized based on args', () => {
    const log = [];
    const staticComputed = ({ test }) => ({ test });

    const EncapsulatedPlugin = {
      render() {
        return (
          <Plugin>
            <Getter
              name="test"
              computed={staticComputed}
            />

            <Template name="root">
              <TemplateConnector>
                {({ test }) => {
                  log.push(test);
                  return null;
                }}
              </TemplateConnector>
            </Template>
          </Plugin>
        );
      },
    };
    const Test = {
      props: { value: {} },
      render() {
        return (
          <PluginHost>
            <Getter name="test" value={this.value} force={{}} />
            <EncapsulatedPlugin />
          </PluginHost>
        );
      },
    };

    const wrapper = mount(<Test value={1} />);
    wrapper.setProps({ value: 1 });
    wrapper.setProps({ value: 2 });

    expect(log).toHaveLength(2);
    expect(log[0]).not.toBe(log[1]);
  });
});
