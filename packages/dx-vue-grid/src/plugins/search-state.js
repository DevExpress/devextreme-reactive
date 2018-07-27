import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { changeSearchValue, searchFilterExpression } from '@devexpress/dx-grid-core';

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
    const { value, changeValue } = this;
    const filterExpressionComputed = (
      { filterExpression, columns },
    ) => searchFilterExpression(value, columns, filterExpression);

    return (
      <DxPlugin
        name="DxSearchState"
      >
        <DxGetter name="filterExpression" computed={filterExpressionComputed} />
        <DxGetter name="searchValue" value={value} />
        <DxAction name="changeSearchValue" action={changeValue} />
      </DxPlugin>
    );
  },
};
