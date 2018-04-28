import { Getter, Plugin } from '@devexpress/dx-vue-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

export const DxCustomPaging = {
  name: 'DxCustomPaging',
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
  },

  render() {
    const { totalCount } = this;

    return (
      <Plugin
        name="DxCustomPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="totalCount" value={totalCount} />
      </Plugin>
    );
  },
};
