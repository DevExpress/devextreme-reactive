import * as React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';
import { Plugin } from './plugin';
import { Template } from './template';
import { Getter } from './getter';
import { TemplateConnector } from './template-connector';

describe('Getter', () => {
  it('should return value', () => {
    const tree = mount((
      <PluginHost>
        <Getter name="test" value="arg" />

        <Template name="root">
          <TemplateConnector>
            {({ test }) => (
              <h1>
                {test}
              </h1>
            )}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('arg');
  });

  it('can use other getters', () => {
    const tree = mount((
      <PluginHost>
        <Getter name="dep" value="dep" />
        <Getter
          name="test"
          computed={getters => getters.dep}
        />

        <Template name="root">
          <TemplateConnector>
            {({ test }) => (
              <h1>
                {test}
              </h1>
            )}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('dep');
  });

  it('should preserve the order if used after another getter', () => {
    const tree = mount((
      <PluginHost>
        <Getter name="dep" value="base" />
        <Getter
          name="test"
          computed={getters => getters.dep}
        />

        <Getter name="dep" value="overriden" />

        <Template name="root">
          <TemplateConnector>
            {({ test }) => (
              <h1>
                {test}
              </h1>
            )}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('base');
  });

  it('should pass the latest result to the template', () => {
    const tree = mount((
      <PluginHost>
        <Getter name="dep" value="base" />

        <Template name="root">
          <TemplateConnector>
            {({ dep }) => (
              <h1>
                {dep}
              </h1>
            )}
          </TemplateConnector>
        </Template>

        <Getter name="dep" value="overriden" />
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('overriden');
  });

  it('can extend getter with same name', () => {
    const tree = mount((
      <PluginHost>
        <Getter name="test" value="base" />
        <Getter
          name="test"
          computed={getters => `${getters.test}_extended`}
        />

        <Template name="root">
          <TemplateConnector>
            {({ test }) => (
              <h1>
                {test}
              </h1>
            )}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('base_extended');
  });

  it('notifies dependencies to update', () => {
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Plugin>
            <Template name="root">
              <TemplateConnector>
                {({ test }) => (
                  <h1>
                    {test}
                  </h1>
                )}
              </TemplateConnector>
            </Template>
          </Plugin>
        );
      }
    }

    const Test = ({ text }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Getter name="test" value={text} />
      </PluginHost>
    );

    const tree = mount(<Test text="extended" />);
    tree.setProps({ text: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  // This test is not correct enough. Rewrite it in future
  it('should be memoized based on args', () => {
    const log: any[] = [];
    const staticComputed = ({ test }: any) => ({ test });

    // tslint:disable-next-line: max-classes-per-file
    class EncapsulatedPlugin extends React.PureComponent {
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
                  log.push(test as any);
                  return null;
                }}
              </TemplateConnector>
            </Template>
          </Plugin>
        );
      }
    }
    const Test = ({ value }) => (
      <PluginHost>
        <Getter name="test" value={value} />
        <EncapsulatedPlugin />
      </PluginHost>
    );

    const tree = mount(<Test value={1} />);
    tree.setProps({ value: 1 });
    tree.setProps({ value: 2 });

    expect(log).toHaveLength(2);
    expect(log[0]).not.toBe(log[1]);
  });

  it('should correct Getter unmount', () => {
    const value = 0;

    const wrapper = mount((
      <PluginHost>
        <Getter name="getter" value={value} />
      </PluginHost>
    ));

    expect(() => { wrapper.unmount(); })
      .not.toThrow();
  });

  it('should not lose Getter when Plugin is inserted', () => {
    const Tester = ({ enabled }) => (
      <PluginHost>
        <Template name="root">
          <TemplateConnector>
            {({ a, b }) => (
              <>
                <h1 className="a">{a}</h1>
                <h1 className="b">{b}</h1>
              </>
            )}
          </TemplateConnector>
        </Template>

        {enabled ? (
          <Plugin>
            <Getter name="b" value={3} />
          </Plugin>
        ) : []}
        <Plugin>
          <Getter name="a" value={1} />
          <Getter name="b" value={2} />
        </Plugin>
      </PluginHost>
    );

    const tree = mount(<Tester enabled={false} />);
    tree.setProps({ enabled: true });

    expect(tree.find('.a').text()).toEqual('1');
    expect(tree.find('.b').text()).toEqual('2');
  });
});
