import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents, getComputedState } from './test-utils';
import { CustomPaging } from './custom-paging';

const defaultDeps = {
  plugins: ['PagingState'],
};

describe('CustomPaging', () => {
  it('should provide value from the "totalCount" property', () => {
    const totalCount = 100;
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <CustomPaging
              totalCount={totalCount}
            />
          </PluginHost>
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
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <CustomPaging />
          </PluginHost>
        );
      },
    });

    expect(getComputedState(tree).totalCount)
      .toBe(0);
  });
});
