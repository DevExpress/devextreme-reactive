import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxPluginHost } from './plugin-host';
import { DxTemplate } from './template';
import { DxTemplatePlaceholder } from './template-placeholder';

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
          <DxPluginHost>
            <DxTemplate name="test">
              <h1>Test content</h1>
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" />
            </DxTemplate>
          </DxPluginHost>
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
          <DxPluginHost>
            <DxTemplate name="test">
              <span>Test content</span>
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test">
                {content => <h1>{content}</h1>}
              </DxTemplatePlaceholder>
            </DxTemplate>
          </DxPluginHost>
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
          <DxPluginHost>
            <DxTemplate name="test">
              {({ attrs: { text } }) => <h1>{text}</h1>}
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" text="param" />
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text())
      .toBe('param');
  });

  it('should support template update on params change', () => {
    const EncapsulatedPlugin = {
      props: {
        text: {
          type: String,
        },
      },
      render() {
        return (
          <DxTemplate name="test">
            {({ attrs: { text } }) => (
              <h1>{text}</h1>
            )}
          </DxTemplate>
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
          <DxPluginHost>
            <EncapsulatedPlugin />

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" text={this.text} />
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });
    wrapper.setData({ text: 'new' });
  });

  it('should support template chain rendering', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <DxTemplate name="test">
              <h1>Test content</h1>
            </DxTemplate>

            <DxTemplate name="test">
              <div> {/* TODO: Wrapper required for multiple children */}
                <DxTemplatePlaceholder />
                <h2>Test content</h2>
              </div>
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" />
            </DxTemplate>
          </DxPluginHost>
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
          <DxPluginHost>
            <DxTemplate name="test">
              {({ attrs: { text } }) => (
                <h1>{text}</h1>
              )}
            </DxTemplate>

            <DxTemplate name="test">
              {() => (
                <DxTemplatePlaceholder />
              )}
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" text="param" />
            </DxTemplate>
          </DxPluginHost>
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
          <DxPluginHost>
            <DxTemplate name="test">
              {({ attrs: { text } }) => (
                <h1>{text}</h1>
              )}
            </DxTemplate>

            <DxTemplate name="test">
              {() => (
                <DxTemplatePlaceholder text="overridden" />
              )}
            </DxTemplate>

            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" text="param" />
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text())
      .toBe('overridden');
  });

  it('should support templates chain update on params change', () => {
    const EncapsulatedPlugin = {
      render() {
        return (
          <DxTemplate name="test">
            {({ attrs: { text } }) => (
              <h1>{text}</h1>
            )}
          </DxTemplate>
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
          <DxPluginHost>
            <EncapsulatedPlugin />

            <DxTemplate name="test">
              {() => (
                <DxTemplatePlaceholder />
              )}
            </DxTemplate>
            <DxTemplate name="root">
              <DxTemplatePlaceholder name="test" text={this.text} />
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });
    wrapper.setData({ text: 'new' });
    expect(wrapper.find('h1').text())
      .toBe('new');
  });
});
