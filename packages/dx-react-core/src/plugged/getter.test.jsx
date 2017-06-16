import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { Template } from './template';
import { Getter } from './getter';

describe('Getter', () => {
  it('should return value', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="test" value={'arg'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('arg');
  });

  it('can use other getters', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'dep'} />
        <Getter
          name="test"
          pureComputed={dep => dep}
          connectArgs={getter => [
            getter('dep'),
          ]}
        />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('dep');
  });

  it('should preserve the order if used after another getter', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'base'} />
        <Getter
          name="test"
          pureComputed={dep => dep}
          connectArgs={getter => [
            getter('dep'),
          ]}
        />

        <Getter name="dep" value={'overriden'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('base');
  });

  it('should pass the latest result to the template', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="dep" value={'base'} />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('dep'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>

        <Getter name="dep" value={'overriden'} />
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('overriden');
  });

  it('can extend getter with same name', () => {
    const tree = mount(
      <PluginHost>
        <Getter name="test" value={'base'} />
        <Getter
          name="test"
          pureComputed={original => `${original}_extended`}
          connectArgs={getter => [
            getter('test'),
          ]}
        />

        <Template
          name="root"
          connectGetters={getter => ({
            prop: getter('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('base_extended');
  });

  it('notifies dependencies to update', () => {
    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Template
            name="root"
            connectGetters={getter => ({
              prop: getter('test'),
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
      text: PropTypes.string.isRequired,
    };

    const tree = mount(
      <Test text="extended" />,
        );
    tree.setProps({ text: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  // This test is not correct enough. Rewrite it in future
  it('should be memoized based on args', () => {
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
                getter('test'),
              ]}
            />

            <Template
              name="root"
              connectGetters={(getter) => {
                log.push(getter('test'));
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
      value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
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
