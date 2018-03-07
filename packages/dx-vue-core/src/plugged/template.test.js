import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './plugin-host';
import { Template } from './template';

describe('Template', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should be rendered', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="root">
              <h1>Template content</h1>
            </Template>
          </PluginHost>
        );
      },
    });
    expect(wrapper.find('h1').text())
      .toEqual('Template content');
  });

  it('should be rendered depending on predicate', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginHost>
            <Template name="root" predicate={() => false}>
              <h1>Template content</h1>
            </Template>
          </PluginHost>
        );
      },
    });
    expect(wrapper.find('h1').exists())
      .toBeFalsy();
  });

  it('should be rerendered when content changes', () => {
    const Test = {
      props: {
        text: {},
      },
      render() {
        return (
          <PluginHost>
            <Template name="root">
              <h1>{this.text}</h1>
            </Template>
          </PluginHost>
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
          <Test text={this.text} />
        );
      },
    });
    wrapper.setData({ text: 'new' });
    expect(wrapper.find('h1').text())
      .toEqual('new');
  });
});
