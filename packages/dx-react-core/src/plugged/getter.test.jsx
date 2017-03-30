import React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Template } from './template';
import { Getter } from './getter';

describe('Getter', () => {
  test('should return value', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="test" value={'arg'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('arg');
  });

  test('can use other getters', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'dep'} />
        <Getter
          name="test"
          pureComputed={dep => dep}
          connectArgs={getter => [
            getter('dep')(),
          ]}
        />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('dep');
  });

  test('order has the meaning', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'base'} />
        <Getter
          name="test"
          pureComputed={dep => dep}
          connectArgs={getter => [
            getter('dep')(),
          ]}
        />

        <Getter name="dep" value={'overriden'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('base');
  });

  test('latest result should be tracked in template', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'base'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('dep')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>

        <Getter name="dep" value={'overriden'} />
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('overriden');
  });

  test('can extend getter with same name', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="test" value={'base'} />
        <Getter
          name="test"
          pureComputed={original => `${original}_extended`}
          connectArgs={getter => [
            getter('test')(),
          ]}
        />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('base_extended');
  });

  test('notifies dependencies to update', () => {
    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Template
            name="root"
            connectGetters={getter => ({
              prop: getter('test')(),
            })}
          >
            {({ prop }) => <h1>{prop}</h1>}
          </Template>
        );
      }
    }

    const Test = ({ text }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Getter name="test" value={text} />
      </PluginHost>
    );
    Test.propTypes = {
      text: React.PropTypes.string.isRequired,
    };

    const tree = mount(
      <Test text="extended" />,
        );
    tree.setProps({ text: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  test('notifies when updated', () => {
    const Test = ({ text, onChange }) => (
      <PluginHost>
        <Getter name="test" value={text} />
        <Getter
          name="test"
          pureComputed={original => `${original}_extended`}
          connectArgs={getter => [
            getter('test')(),
          ]}
          onChange={onChange}
        />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test')(),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      text: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func.isRequired,
    };

    const onChange = jest.fn();
    const tree = mount(
      <Test text="text" onChange={onChange} />,
    );
    tree.setProps({ text: 'text' });
    tree.setProps({ text: 'new' });

    expect(onChange.mock.calls).toHaveLength(2);
    expect(onChange.mock.calls[0][0]).toBe('text_extended');
    expect(onChange.mock.calls[1][0]).toBe('new_extended');
  });

    // This test is not correct enough. Rewrite it in future
  test('memoization based on args', () => {
    const staticValue = {};
    const log = [];

    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <div>
            <Getter
              name="test"
              pureComputed={() => ({})}
              connectArgs={getter => [
                getter('test')(),
              ]}
            />

            <Template
              name="root"
              connectGetters={(getter) => {
                log.push(getter('test')());
              }}
            />
          </div>
        );
      }
    }
    const Test = ({ value }) => (
      <PluginHost>
        <Getter name="test" value={value} force={{}} />
        <EncapsulatedPlugin />
      </PluginHost>
    );
    Test.propTypes = {
      value: React.PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    };

    const tree = mount(
      <Test value={staticValue} />,
    );
    tree.setProps({ value: staticValue });
    tree.setProps({ value: {} });

    expect(log).toHaveLength(3);
    expect(log[0]).toBe(log[1]);
    expect(log[1]).not.toBe(log[2]);
  });
});
