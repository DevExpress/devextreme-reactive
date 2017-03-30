import React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Action } from './action';
import { Template } from './template';

describe('Action', () => {
  test('should return value', () => {
    const Test = ({ onAction }) => (
      <PluginHost>
        <Action name="test" action={onAction} />

        <Template
          name="root"
          connectActions={action => ({
            onTest: () => action('test')(),
          })}
        >
          {({ onTest }) => <button onClick={onTest}>Text</button>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      onAction: React.PropTypes.func.isRequired,
    };

    const onAction = jest.fn();
    const tree = mount(
      <Test onAction={onAction} />,
        );

    tree.find('button').simulate('click');
    expect(onAction.mock.calls).toHaveLength(1);
  });
});
