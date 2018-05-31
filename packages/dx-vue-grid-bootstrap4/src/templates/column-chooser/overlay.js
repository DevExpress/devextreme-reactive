import { Popover } from '../popover';

export const Overlay = {
  name: 'Overlay',
  props: {
    visible: {
      type: Boolean,
    },
    target: null,
  },
  render() {
    const {
      visible, target,
    } = this;
    const handleToggle = () => {
      if (visible) this.$emit('hide');
    };
    return (
      target ? (
        <Popover
          visible={visible}
          target={target}
          onToggle={handleToggle}
        >
          {this.$slots.default}
        </Popover>
      ) : null
    );
  },
};
