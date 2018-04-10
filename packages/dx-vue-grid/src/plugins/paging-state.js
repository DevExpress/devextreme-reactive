import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';

export const PagingState = {
  name: 'PagingState',
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    setCurrentPageComputed(payload) {
      this.$emit(
        'update:currentPage',
        setCurrentPage(this.currentPage, payload),
      );
    },
    setPageSizeComputed(payload) {
      this.$emit(
        'update:pageSize',
        setPageSize(this.pageSize, payload),
      );
    },
  },
  render() {
    const {
      pageSize, currentPage, setCurrentPageComputed, setPageSizeComputed,
    } = this;

    return (
      <Plugin
        name="PagingState"
      >
        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />

        <Action name="setCurrentPage" action={setCurrentPageComputed} />
        <Action name="setPageSize" action={setPageSizeComputed} />
      </Plugin>
    );
  },
};
