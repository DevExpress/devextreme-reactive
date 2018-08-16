export const CommandButton = {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  render() {
    return (
      <button
        class="btn btn-link dx-g-bs4-table-edit-command-cell"
        onClick={() => {
          this.$emit('execute');
        }}
      >
        {this.text}
      </button>
    );
  },
};

export const EditCommandHeadingCell = {
  props: {
    tableColumn: {
      type: Object,
    },
    tableRow: {
      type: Object,
    },
  },
  render() {
    return (
      <th
        class="text-center p-0 text-nowrap"
      >
        {this.$slots.default}
      </th>
    );
  },
};

export const EditCommandCell = {
  props: {
    row: null,
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render() {
    return (
      <td
        class="text-center p-0 text-nowrap"
      >
        {this.$slots.default}
      </td>
    );
  },
};
