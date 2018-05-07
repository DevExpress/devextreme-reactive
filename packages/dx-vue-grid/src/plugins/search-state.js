import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { changeSearchValue, pushSearchFilterExpression } from '@devexpress/dx-grid-core';

export const SearchState = {
  name: 'SearchState',
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
      <Plugin
        name="SearchState"
      >
        <Getter name="filterExpression" computed={pushSearchFilterExpression(this.value)} />
        <Getter name="searchValue" value={this.value} />
        <Action name="changeSearchValue" action={this.changeValue} />
      </Plugin>
    );
  },
};
