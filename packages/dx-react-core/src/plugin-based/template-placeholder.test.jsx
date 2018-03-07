import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';
import { Plugin } from './plugin';
import { Template } from './template';
import { TemplateConnector } from './template-connector';
import { TemplatePlaceholder } from './template-placeholder';
import { Getter } from './getter';

describe('TemplatePlaceholder', () => {
  it('should be a place for template rendering', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          <h1>Test content</h1>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  it('can accept a content render function as a child', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          <span>Test content</span>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => <h1>{content}</h1>}
          </TemplatePlaceholder>
        </Template>
      </PluginHost>
    ));

    expect(tree.render().find('h1 > span')).toHaveLength(1);
  });

  it('should update on content render function change', () => {
    const Test = ({ text }) => (
      <PluginHost>
        <Template name="test">
          <span />
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => <h1>{text}{content}</h1>}
          </TemplatePlaceholder>
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      text: PropTypes.string.isRequired,
    };

    const tree = mount(<Test text="old" />);

    tree.setProps({ text: 'new' });
    expect(tree.find('h1').text())
      .toBe('new');
  });

  it('should pass params to the template which is rendered inside it', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          {({ text }) => <h1>{text}</h1>}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('param');
  });

  it('should support template update on params change', () => {
    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Plugin>
            <Template name="test">
              {({ text }) => (
                <h1>{text}</h1>
              )}
            </Template>
          </Plugin>
        );
      }
    }

    const Test = ({ param }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: param }} />
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      param: PropTypes.string.isRequired,
    };

    const tree = mount(<Test param="text" />);
    tree.setProps({ param: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  it('should support template chain rendering', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          <h1>Test content</h1>
        </Template>

        <Template name="test">
          <TemplatePlaceholder />
          <h2>Test content</h2>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').exists()).toBeTruthy();
    expect(tree.find('h2').exists()).toBeTruthy();
  });

  it('should pass params to the template chain which is rendered inside it', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          {({ text }) => (
            <h1>{text}</h1>
          )}
        </Template>

        <Template name="test">
          {() => (
            <TemplatePlaceholder />
          )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('param');
  });

  it('should allow to override params in the template chain', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          {({ text }) => (
            <h1>{text}</h1>
          )}
        </Template>

        <Template name="test">
          {() => (
            <TemplatePlaceholder params={{ text: 'overriden' }} />
          )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('overriden');
  });

  it('should support templates chain update on params change', () => {
    // eslint-disable-next-line
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Plugin>
            <Template name="test">
              {({ text }) => (
                <h1>{text}</h1>
              )}
            </Template>
          </Plugin>
        );
      }
    }

    const Test = ({ param }) => (
      <PluginHost>
        <EncapsulatedPlugin />

        <Template name="test">
          {() => (
            <TemplatePlaceholder />
          )}
        </Template>
        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: param }} />
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      param: PropTypes.string.isRequired,
    };

    const tree = mount(<Test param="text" />);
    tree.setProps({ param: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  it('should supply correct params for different template chains', () => {
    const tree = mount((
      <PluginHost>
        <Template name="testNested">
          {params => (
            <h1>{params && params.text}</h1>
          )}
        </Template>

        <Template name="test">
          {({ text }) => (
            <div>
              <TemplatePlaceholder name="testNested" />
              <h2>{text}</h2>
            </div>
          )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('');
    expect(tree.find('h2').text()).toBe('param');
  });

  it('should supply correct element with connected properties when templates are chained', () => {
    const getterValue = 'test value';
    const tree = mount((
      <PluginHost>
        <Getter name="testGetter" value={getterValue} />

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => (<div>{content}</div>)}
          </TemplatePlaceholder>
        </Template>

        <Template name="test">
          <TemplateConnector>
            {({ testGetter }) => <div className="test" >{testGetter}</div>}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('.test').text())
      .toBe(getterValue);
  });
});
