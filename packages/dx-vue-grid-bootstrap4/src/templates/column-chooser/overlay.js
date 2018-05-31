import { Popover } from '../popover';

export const Overlay = {
  name: 'Overlay',
  props: {
    visible: {
      type: Boolean,
    },
    target: {
      type: String,
    },
  },
  render() {
    const {
      visible, target,
    } = this;
    const handleToggle = () => {
      if (visible) this.$listeners.hide();
    };
    return (
      target ? (
        <Popover
          visible={visible}
          target={target}
          toggle={handleToggle}
        >
          {this.$slots.defauls}
        </Popover>
      ) : null
    );
  },
};
