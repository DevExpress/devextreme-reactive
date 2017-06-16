import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Template } from './template';

describe('Template', () => {
  it('should be rendered', () => {
    const tree = mount(
      <PluginHost>
        <Template name="root">
          <h1>Template content</h1>
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  it('should be rendered depending on predicate', () => {
    const tree = mount(
      <PluginHost>
        <Template name="root" predicate={() => false}>
          <h1>Template content</h1>
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').exists()).toBeFalsy();
  });

  it('should be rerendered when content changes', () => {
    const Test = ({ text }) => (
      <PluginHost>
        <Template name="root">
          <h1>{text}</h1>
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      text: PropTypes.string.isRequired,
    };

    const tree = mount(
      <Test text={'test'} />,
    );
    tree.setProps({ text: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });
});
