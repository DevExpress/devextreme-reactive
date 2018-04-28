import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { changeSearchValue, pushSearchFilterExpression } from '@devexpress/dx-grid-core';

export const DxSearchState = {
  name: 'DxSearchState',
  props: {
    value: {
      type: String,
      default: '',
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
      <Plugin
        name="DxSearchState"
      >
        <Getter name="filterExpression" computed={pushSearchFilterExpression(this.value)} />
        <Getter name="searchValue" value={this.value} />
        <Action name="changeSearchValue" action={this.changeValue} />
      </Plugin>
    );
  },
};
