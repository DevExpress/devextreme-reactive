import { mount } from '@vue/test-utils';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-vue-core';
import { DxToolbar } from './toolbar';

describe('DxToolbar', () => {
  const Root = { render() { return null; } };
  const FlexibleSpaceComponent = { render() { return null; } };
  const defaultProps = {
    rootComponent: Root,
    flexibleSpaceComponent: FlexibleSpaceComponent,
  };

  it('should render DxToolbar', () => {
    const tree = mount({
      render() {
        return (<PluginHost>
          <DxToolbar {...{ attrs: { ...defaultProps } }} />
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
            <DxToolbar {...{ attrs: { ...defaultProps } }} />
            <TemplatePlaceholder name="toolbarContent" />
          </PluginHost>
        );
      },
    });

    expect(tree.find(FlexibleSpaceComponent).exists())
      .toBeTruthy();
  });
});
