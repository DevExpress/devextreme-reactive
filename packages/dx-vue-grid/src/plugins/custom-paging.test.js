import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents, getComputedState } from './test-utils';
import { DxCustomPaging } from './custom-paging';

const defaultDeps = {
  plugins: ['DxPagingState'],
};

describe('DxCustomPaging', () => {
  it('should provide value from the "totalCount" property', () => {
    const totalCount = 100;
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomPaging
              totalCount={totalCount}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).totalCount)
      .toBe(totalCount);
  });

  it('should provide \'0\' if a value for the "totalCount" property undefined', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomPaging />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).totalCount)
      .toBe(0);
  });
});
