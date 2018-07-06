export const TableTreeIndent = {
  functional: true,
  props: {
    level: {
      type: Number,
      default: 0,
    },
  },
  render(h, context) {
    return Array.from({ length: context.props.level })
      .map((value, currentLevel) => (
        <span
          key={currentLevel}
          class="d-inline-block mr-4"
        />
      ));
  },
};
