import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './host';
import { PluginContainer } from './container';
import { Template } from './template';
import { Property } from './property';

describe('Property', () => {
  it('should return value', () => {
    const tree = mount(
      <PluginHost>
        <Property name="test" value={'arg'} />

        <Template
          name="root"
          connectProperties={property => ({
            prop: property('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('arg');
  });

  it('can use other properties', () => {
    const tree = mount(
      <PluginHost>
        <Property name="dep" value={'dep'} />
        <Property
          name="test"
          computed={properties => properties.dep}
        />

        <Template
          name="root"
          connectProperties={property => ({
            prop: property('test'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('dep');
  });

  it('should preserve the order if used after another property', () => {
    const tree = mount(
      <PluginHost>
        <Property name="dep" value={'base'} />
        <Property
          name="test"
          computed={properties => properties.dep}
        />

        <Property name="dep" value={'overriden'} />

        <Template
          name="root"
          connectProperties={property => ({
            prop: property('test'),
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
        <Property name="dep" value={'base'} />

        <Template
          name="root"
          connectProperties={property => ({
            prop: property('dep'),
          })}
        >
          {({ prop }) => <h1>{prop}</h1>}
        </Template>

        <Property name="dep" value={'overriden'} />
      </PluginHost>,
    );

    expect(tree.find('h1').text()).toBe('overriden');
  });

  it('can extend property with same name', () => {
    const tree = mount(
      <PluginHost>
        <Property name="test" value={'base'} />
        <Property
          name="test"
          computed={properties => `${properties.test}_extended`}
        />

        <Template
          name="root"
          connectProperties={property => ({
            prop: property('test'),
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
          <PluginContainer>
            <Template
              name="root"
              connectProperties={property => ({
                prop: property('test'),
              })}
            >
              {({ prop }) => <h1>{prop}</h1>}
            </Template>
          </PluginContainer>
        );
      }
    }

    const Test = ({ text }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Property name="test" value={text} />
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
    const log = [];
    const staticComputed = ({ test }) => ({ test });

    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <PluginContainer>
            <Property
              name="test"
              computed={staticComputed}
            />

            <Template
              name="root"
              connectProperties={(property) => {
                log.push(property('test'));
              }}
            >
              <div />
            </Template>
          </PluginContainer>
        );
      }
    }
    const Test = ({ value }) => (
      <PluginHost>
        <Property name="test" value={value} force={{}} />
        <EncapsulatedPlugin />
      </PluginHost>
    );
    Test.propTypes = {
      value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    };

    const tree = mount(
      <Test value={1} />,
    );
    tree.setProps({ value: 1 });
    tree.setProps({ value: 2 });

    expect(log).toHaveLength(3);
    expect(log[0]).toBe(log[1]);
    expect(log[1]).not.toBe(log[2]);
  });
});
