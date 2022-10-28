import 'jsdom-global/register';
import * as React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';
import { Template } from './template';

describe('Template', () => {
  it('should be rendered', () => {
    const tree = mount((
      <PluginHost>
        <Template name="root">
          <h1>
            Template content
          </h1>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  it('should be rendered depending on predicate', () => {
    const tree = mount((
      <PluginHost>
        <Template name="root" predicate={() => false}>
          <h1>
            Template content
          </h1>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').exists()).toBeFalsy();
  });

  it('should be rerendered when content changes', () => {
    const Test = ({ text }) => (
      <PluginHost>
        <Template name="root">
          <h1>
            {text}
          </h1>
        </Template>
      </PluginHost>
    );

    const tree = mount(<Test text="test" />);
    tree.setProps({ text: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  it('should be rerendered when added', () => {
    const Test = ({ showSecond }) => (
      <PluginHost>
        <Template name="root">
          <h1>
            first
          </h1>
        </Template>
        {showSecond && (
          <Template name="root">
            <h1>
              second
            </h1>
          </Template>
        )}
      </PluginHost>
    );

    const tree = mount(<Test showSecond={false} />);
    tree.setProps({ showSecond: true });

    expect(tree.find('h1').text()).toBe('second');
  });

  it('should be rerendered when removed', () => {
    const Test = ({ showSecond }) => (
      <PluginHost>
        <Template name="root">
          <h1>
            first
          </h1>
        </Template>
        {showSecond && (
          <Template name="root">
            <h1>
              second
            </h1>
          </Template>
        )}
      </PluginHost>
    );

    const tree = mount(<Test showSecond />);
    tree.setProps({ showSecond: false });

    expect(tree.find('h1').text()).toBe('first');
  });

  it('should correct Template unmount', () => {
    const wrapper = mount((
      <PluginHost>
        <Template name="root">
          <span/>
        </Template>
      </PluginHost>
    ));

    expect(() => { wrapper.unmount(); })
      .not.toThrow();
  });
});
