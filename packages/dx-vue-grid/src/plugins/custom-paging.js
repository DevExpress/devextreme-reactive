import { Getter, Plugin } from '@devexpress/dx-vue-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

export const CustomPaging = {
  name: 'CustomPaging',
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
        name="CustomPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="totalCount" value={totalCount} />
      </Plugin>
    );
  },
};
