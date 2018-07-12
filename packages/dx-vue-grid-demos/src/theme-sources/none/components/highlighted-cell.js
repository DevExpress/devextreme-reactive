export const HighlightedCell = {
  inheritAttrs: false,
  props: {
    tableColumn: {
      type: Object,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getColor() {
      if (this.value < 3000) {
        return '#fc7a76';
      }
      if (this.value < 5000) {
        return '#ffb294';
      }
      if (this.value < 8000) {
        return '#ffd59f';
      }
      return '#c3e2b7';
    },
  },
  template: `
    <td
      :style="{
        backgroundColor: getColor(),
        textAlign: tableColumn.align,
      }"
    >
      <slot />
    </td>
  `,
};
