import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxPluginHost } from './plugin-host';
import { DxTemplate } from './template';

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
          <DxPluginHost>
            <DxTemplate name="root">
              <h1>Template content</h1>
            </DxTemplate>
          </DxPluginHost>
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
          <DxPluginHost>
            <DxTemplate name="root" predicate={() => false}>
              <h1>Template content</h1>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });
    expect(wrapper.find('h1').exists())
      .toBeFalsy();
  });

  it('should be rerendered when content changes', () => {
    const Test = {
      props: {
        text: {
          type: String,
        },
      },
      render() {
        return (
          <DxPluginHost>
            <DxTemplate name="root">
              <h1>{this.text}</h1>
            </DxTemplate>
          </DxPluginHost>
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
