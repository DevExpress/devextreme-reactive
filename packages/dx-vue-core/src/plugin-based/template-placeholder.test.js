import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './plugin-host';
import { Template } from './template';
import { TemplatePlaceholder } from './template-placeholder';

describe('TemplatePlaceholder', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should be a place for template rendering', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="test">
              <h1>Test content</h1>
            </Template>

            <Template name="root">
              <TemplatePlaceholder name="test" />
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').exists())
      .toBeTruthy();
  });

  it('can accept a content render function as a child', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="test">
              <span>Test content</span>
            </Template>

            <Template name="root">
              <TemplatePlaceholder name="test">
                {content => <h1>{content}</h1>}
              </TemplatePlaceholder>
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.contains('h1 > span'))
      .toBeTruthy();
  });

  it('should pass params to the template which is rendered inside it', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="test">
              {({ text }) => <h1>{text}</h1>}
            </Template>

            <Template name="root">
              <TemplatePlaceholder name="test" params={{ text: 'param' }} />
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text())
      .toBe('param');
  });

  it('should support template update on params change', () => {
    const EncapsulatedPlugin = {
      props: {
        text: {},
      },
      render() {
        return (
          <Template name="test">
            {({ text }) => (
              <h1>{text}</h1>
            )}
          </Template>
        );
      },
    };
    const wrapper = mount({
      data() {
        return {
          text: 'test',
        };
      },
      render() {
        return (
          <PluginHost>
            <EncapsulatedPlugin />

            <Template name="root">
              <TemplatePlaceholder name="test" params={{ text: this.text }} />
            </Template>
          </PluginHost>
        );
      },
    });
    wrapper.setData({ text: 'new' });
  });

  it('should support template chain rendering', () => {
    const wrapper = mount({
      render() {
        return (
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
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').exists())
      .toBeTruthy();
    expect(wrapper.find('h2').exists())
      .toBeTruthy();
  });

  it('should pass params to the template chain which is rendered inside it', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="test">
              {({ text }) => (
                <h1>{text}</h1>
              )}
            </Template>

            <Template name="test">
              {() => (
                <TemplatePlaceholder />
              )}
            </Template>

            <Template name="root">
              <TemplatePlaceholder name="test" params={{ text: 'param' }} />
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text())
      .toBe('param');
  });

  it('should allow to override params in the template chain', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="test">
              {({ text }) => (
                <h1>{text}</h1>
              )}
            </Template>

            <Template name="test">
              {() => (
                <TemplatePlaceholder params={{ text: 'overriden' }} />
              )}
            </Template>

            <Template name="root">
              <TemplatePlaceholder name="test" params={{ text: 'param' }} />
            </Template>
          </PluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text())
      .toBe('overriden');
  });

  it('should support templates chain update on params change', () => {
    const EncapsulatedPlugin = {
      props: {
        text: {},
      },
      render() {
        return (
          <Template name="test">
            {({ text }) => (
              <h1>{text}</h1>
            )}
          </Template>
        );
      },
    };
    const wrapper = mount({
      data() {
        return {
          text: 'test',
        };
      },
      render() {
        return (
          <PluginHost>
            <EncapsulatedPlugin />

            <Template name="test">
              {() => (
                <TemplatePlaceholder />
              )}
            </Template>
            <Template name="root">
              <TemplatePlaceholder name="test" params={{ text: this.text }} />
            </Template>
          </PluginHost>
        );
      },
    });
    wrapper.setData({ text: 'new' });
    expect(wrapper.find('h1').text())
      .toBe('new');
  });
});
