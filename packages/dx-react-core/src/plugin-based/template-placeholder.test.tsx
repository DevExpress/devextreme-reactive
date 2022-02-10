import * as React from 'react';
import { mount, render } from 'enzyme';

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
          <h1>
            Test content
          </h1>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  it('can accept a content render function as a child', () => {
    const tree = render((
      <PluginHost>
        <Template name="test">
          <span>
            Test content
          </span>
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => (
              <h1>
                {content}
              </h1>
            )}
          </TemplatePlaceholder>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1 > span')).toHaveLength(1);
  });

  it('should update on content render function change', () => {
    const Test = ({ text }) => (
      <PluginHost>
        <Template name="test">
          <span />
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test">
            {content => (
              <h1>
                {text}
                {content}
              </h1>
            )}
          </TemplatePlaceholder>
        </Template>
      </PluginHost>
    );

    const tree = mount(<Test text="old" />);

    tree.setProps({ text: 'new' });
    expect(tree.find('h1').text())
      .toBe('new');
  });

  it('should pass params to the template which is rendered inside it', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          {({ text }: any) => (
            <h1>
              {text}
            </h1>
          )}
        </Template>

        <Template name="root">
          <TemplatePlaceholder name="test" params={{ text: 'param' }} />
        </Template>
      </PluginHost>
    ));

    expect(tree.find('h1').text()).toBe('param');
  });

  it('should support template update on params change', () => {
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Plugin>
            <Template name="test">
              {({ text }: any) => (
                <h1>
                  {text}
                </h1>
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

    const tree = mount(<Test param="text" />);
    tree.setProps({ param: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  it('should support template chain rendering', () => {
    const tree = mount((
      <PluginHost>
        <Template name="test">
          <h1>
            Test content
          </h1>
        </Template>

        <Template name="test">
          <TemplatePlaceholder />
          <h2>
            Test content
          </h2>
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
          {({ text }: any) => (
            <h1>
              {text}
            </h1>
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
          {({ text }: any) => (
            <h1>
              {text}
            </h1>
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
    // tslint:disable-next-line: max-classes-per-file
    class EncapsulatedPlugin extends React.PureComponent {
      render() {
        return (
          <Plugin>
            <Template name="test">
              {({ text }: any) => (
                <h1>
                  {text}
                </h1>
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

    const tree = mount(<Test param="text" />);
    tree.setProps({ param: 'new' });

    expect(tree.find('h1').text()).toBe('new');
  });

  it('should supply correct params for different template chains', () => {
    const tree = mount((
      <PluginHost>
        <Template name="testNested">
          {(params: any) => (
            <h1>
              {params && params.text}
            </h1>
          )}
        </Template>

        <Template name="test">
          {({ text }: any) => (
            <div>
              <TemplatePlaceholder name="testNested" />
              <h2>
                {text}
              </h2>
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
            {content => (
              <div>
                {content}
              </div>
            )}
          </TemplatePlaceholder>
        </Template>

        <Template name="test">
          <TemplateConnector>
            {({ testGetter }) => (
              <div className="test">
                {testGetter}
              </div>
            )}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    expect(tree.find('.test').text())
      .toBe(getterValue);
  });

  it('should correct TemplatePlaceholder unmount', () => {
    const wrapper = mount((
      <PluginHost>
        <TemplatePlaceholder name="template" />
      </PluginHost>
    ));

    expect(() => { wrapper.unmount(); })
      .not.toThrow();
  });

  it('should return content of the associated template', () => {
    const Tester = ({ name }) => {
      return (
        <Plugin name="Tester">
          <Template name="test">
            <TemplatePlaceholder />
            <div className={name}>{name}</div>
          </Template>
        </Plugin>
      );
    };

    const Root = ({ enabled }) => (
      <div className="container">
        <PluginHost>
          <Template name="root">
            <TemplatePlaceholder name="test" />
          </Template>
          <Template name="test">
            <div className="root">root</div>
          </Template>

          <Tester name="t1" />
          {enabled && <Tester name="t2" />}
        </PluginHost>
      </div>
    );

    const tree = mount(<Root enabled={true} />);
    tree.setProps({ enabled: false });

    expect(tree.find('.container').html()).toEqual((
      '<div class="container"><div class="root">root</div><div class="t1">t1</div></div>'
    ));
  });

  it('should update third element', () => {
    const Element = () => {
      return (
        <Plugin name="Element">
          <Template name="testContent">
            <div className="element">Element</div>
            <TemplatePlaceholder />
          </Template>
        </Plugin>
      );
    }
    const Root = ({ enabled }) => (
      <div>
        <PluginHost>
          <Template name="root">
            <TemplatePlaceholder name="test" />
          </Template>
          <Template name="test">
            <TemplatePlaceholder name="testContent" />
          </Template>

          {enabled && <Element />}
          <Element />
          <Element />
        </PluginHost>
      </div>
    );

    const tree = mount(<Root enabled={false} />);
    tree.setProps({ enabled: true });

    expect(tree.find('.element').length).toEqual(3);
  });
});
