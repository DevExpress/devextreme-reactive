import { mount } from '@vue/test-utils';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-vue-core';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  const Root = { render() { return null; } };
  const FlexibleSpaceComponent = { render() { return null; } };
  const defaultProps = {
    rootComponent: Root,
    flexibleSpaceComponent: FlexibleSpaceComponent,
  };

  it('should render Toolbar', () => {
    const tree = mount({
      render() {
        return (<PluginHost>
          <Toolbar {...{ attrs: { ...defaultProps } }} />
          <TemplatePlaceholder name="header" />
        </PluginHost>);
      },
    });

    expect(tree.find(Root).exists())
      .toBeTruthy();
  });

  it('should render flexible space', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <Toolbar {...{ attrs: { ...defaultProps } }} />
            <TemplatePlaceholder name="toolbarContent" />
          </PluginHost>
        );
      },
    });

    expect(tree.find(FlexibleSpaceComponent).exists())
      .toBeTruthy();
  });
});
