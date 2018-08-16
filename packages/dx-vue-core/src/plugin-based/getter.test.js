import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxPluginHost } from './plugin-host';
import { DxPlugin } from './plugin';
import { DxTemplate } from './template';
import { DxGetter } from './getter';
import { DxTemplateConnector } from './template-connector';

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
          <DxPluginHost>
            <DxGetter name="test" value="arg" />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('arg');
  });

  it('can use other getters', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <DxGetter name="dep" value="dep" />
            <DxGetter
              name="test"
              computed={getters => getters.dep}
            />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('dep');
  });

  it('should preserve the order if used after another getter', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <DxGetter name="dep" value="base" />
            <DxGetter
              name="test"
              computed={getters => getters.dep}
            />

            <DxGetter name="dep" value="overriden" />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('base');
  });

  it('should pass the latest result to the template', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <DxGetter name="dep" value="base" />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { dep } }) => <h1>{dep}</h1>}
              </DxTemplateConnector>
            </DxTemplate>

            <DxGetter name="dep" value="overriden" />
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('overriden');
  });

  it('can extend getter with same name', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <DxGetter name="test" value="base" />
            <DxGetter
              name="test"
              computed={getters => `${getters.test}_extended`}
            />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    expect(wrapper.find('h1').text()).toBe('base_extended');
  });

  it('notifies dependencies to update', () => {
    const EncapsulatedPlugin = {
      render() {
        return (
          <DxPlugin>
            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ getters: { test } }) => <h1>{test}</h1>}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPlugin>
        );
      },
    };

    const Test = {
      props: ['text'],
      render() {
        return (
          <DxPluginHost>
            <EncapsulatedPlugin />

            <DxGetter name="test" value={this.text} />
          </DxPluginHost>
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

  it('should return the same instance of the file value in several connections', () => {
    const EncapsulatedPlugin = {
      render() {
        return (
          <DxPlugin>
            <DxTemplate name="root">
              <div>
                <DxTemplateConnector>
                  {({ getters: { test } }) => <h1>{test}</h1>}
                </DxTemplateConnector>
                <DxTemplateConnector>
                  {({ getters: { test } }) => <h2>{test}</h2>}
                </DxTemplateConnector>
              </div>
            </DxTemplate>
          </DxPlugin>
        );
      },
    };

    const Test = {
      props: ['text'],
      render() {
        let counter = 0;
        return (
          <DxPluginHost>
            <EncapsulatedPlugin />

            <DxGetter
              name="test"
              computed={() => {
                counter += 1;
                return `${this.text}_${counter}`;
              }}
            />
          </DxPluginHost>
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

    expect(wrapper.find('h2').text())
      .toBe('old_1');
  });
});
