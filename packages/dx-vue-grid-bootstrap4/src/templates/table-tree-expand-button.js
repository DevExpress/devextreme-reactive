import { ExpandButton } from './parts/expand-button';

export const TableTreeExpandButton = {
  props: {
    visible: {},
    expanded: {},
  },
  render() {
    return (
      <ExpandButton
        visible={this.visible}
        expanded={this.expanded}
        onToggle={() => this.$emit('toggle')}
        class="mr-3"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      />
    );
  },
};
