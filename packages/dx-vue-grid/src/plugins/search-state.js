import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { changeSearchValue, pushSearchFilterExpression } from '@devexpress/dx-grid-core';

export const DxSearchState = {
  name: 'DxSearchState',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeValue(payload) {
      this.$emit(
        'update:value',
        changeSearchValue(this.value, payload),
      );
    },
  },
  render() {
    return (
      <DxPlugin
        name="DxSearchState"
      >
        <DxGetter name="filterExpression" computed={pushSearchFilterExpression(this.value)} />
        <DxGetter name="searchValue" value={this.value} />
        <DxAction name="changeSearchValue" action={this.changeValue} />
      </DxPlugin>
    );
  },
};
