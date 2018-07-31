import { ExpandButton } from './parts/expand-button';

export const TableDetailToggleCell = {
  props: {
    expanded: {
      type: Boolean,
    },
  },
  render() {
    const toggle = () => this.$emit('toggle');
    return (
      <td
        class="text-center align-middle"
      >
        <ExpandButton
          expanded={this.expanded}
          onToggle={toggle}
        />
      </td>
    );
  },
};
