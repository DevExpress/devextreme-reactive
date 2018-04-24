import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { changeSearchValue, searchFilterExpression } from '@devexpress/dx-grid-core';

export const SearchState = {
  name: 'SearchState',
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
    const { value, changeValue } = this;
    const filterExpressionComputed = ({ filterExpression, columns }) =>
      searchFilterExpression(value, columns, filterExpression);

    return (
      <Plugin
        name="SearchState"
      >
        <Getter name="filterExpression" computed={filterExpressionComputed} />
        <Getter name="searchValue" value={value} />
        <Action name="changeSearchValue" action={changeValue} />
      </Plugin>
    );
  },
};
