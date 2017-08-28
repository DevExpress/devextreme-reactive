import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Property } from './property';
import { Action } from './action';
import { Watcher } from './watcher';

describe('Watcher', () => {
  it('should be invoked on componentWillMount', () => {
    const changeLogger = jest.fn();
    const actionLogger = jest.fn();
    mount(
      <PluginHost>
        <Property name="test" value={'arg'} />
        <Action name="test" action={actionLogger} />
        <Watcher watch={property => ([property('test')])} onChange={changeLogger} />
      </PluginHost>,
    );

    expect(changeLogger.mock.calls).toHaveLength(1);
    expect(changeLogger.mock.calls[0]).toHaveLength(2);
    expect(changeLogger.mock.calls[0][1]).toBe('arg');
    expect(actionLogger.mock.calls).toHaveLength(0);

    const action = changeLogger.mock.calls[0][0];
    expect(action).not.toBeUndefined();
    action('test')('arg');
    expect(actionLogger.mock.calls).toHaveLength(1);
    expect(actionLogger.mock.calls[0][0]).toBe('arg');
  });

  it('should be invoked only if dependencies change', () => {
    const changeLogger = jest.fn();

    const Test = ({ dependency }) => (
      <PluginHost>
        <Property name="test" computed={() => dependency} />
        <Watcher watch={property => ([property('test')])} onChange={changeLogger} />
      </PluginHost>
    );
    Test.propTypes = {
      dependency: PropTypes.string.isRequired,
    };

    const tree = mount(
      <Test dependency="a" />,
    );
    expect(changeLogger.mock.calls).toHaveLength(1);

    tree.setProps({ dependency: 'a' });
    expect(changeLogger.mock.calls).toHaveLength(1);

    tree.setProps({ dependency: 'b' });
    expect(changeLogger.mock.calls).toHaveLength(2);
  });
});
