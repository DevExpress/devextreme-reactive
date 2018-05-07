import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';

export const DxPagingState = {
  name: 'DxPagingState',
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
      <DxPlugin
        name="DxPagingState"
      >
        <DxGetter name="pageSize" value={pageSize} />
        <DxGetter name="currentPage" value={currentPage} />

        <DxAction name="setCurrentPage" action={this.setCurrentPage} />
        <DxAction name="setPageSize" action={this.setPageSize} />
      </DxPlugin>
    );
  },
};
