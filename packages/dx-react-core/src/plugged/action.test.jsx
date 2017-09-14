import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';
import { Action } from './action';
import { Template } from './template';
import { TemplateConnector } from './template-connector';

describe('Action', () => {
  it('should return value', () => {
    const Test = ({ onAction }) => (
      <PluginHost>
        <Action name="test" action={onAction} />

        <Template name="root">
          <TemplateConnector>
            {(getters, { test }) => <button onClick={test}>Text</button>}
          </TemplateConnector>
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      onAction: PropTypes.func.isRequired,
    };

    const onAction = jest.fn();
    const tree = mount(
      <Test onAction={onAction} />,
    );

    tree.find('button').simulate('click');
    expect(onAction.mock.calls).toHaveLength(1);
  });
});
