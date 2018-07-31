import { mount } from '@vue/test-utils';
import { DxPluginHost, DxTemplatePlaceholder } from '@devexpress/dx-vue-core';
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
        return (<DxPluginHost>
          <DxToolbar {...{ attrs: { ...defaultProps } }} />
          <DxTemplatePlaceholder name="header" />
        </DxPluginHost>);
      },
    });

    expect(tree.find(Root).exists())
      .toBeTruthy();
  });

  it('should render flexible space', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <DxToolbar {...{ attrs: { ...defaultProps } }} />
            <DxTemplatePlaceholder name="toolbarContent" />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(FlexibleSpaceComponent).exists())
      .toBeTruthy();
  });
});
