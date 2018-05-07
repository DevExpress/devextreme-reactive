import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';

export const PagingState = {
  name: 'PagingState',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    setCurrentPage(payload) {
      this.$emit(
        'update:currentPage',
        setCurrentPage(this.currentPage, payload),
      );
    },
    setPageSize(payload) {
      this.$emit(
        'update:pageSize',
        setPageSize(this.pageSize, payload),
      );
    },
  },
  render() {
    const { pageSize, currentPage } = this;

    return (
      <Plugin
        name="PagingState"
      >
        <Getter name="pageSize" value={pageSize} />
        <Getter name="currentPage" value={currentPage} />

        <Action name="setCurrentPage" action={this.setCurrentPage} />
        <Action name="setPageSize" action={this.setPageSize} />
      </Plugin>
    );
  },
};
