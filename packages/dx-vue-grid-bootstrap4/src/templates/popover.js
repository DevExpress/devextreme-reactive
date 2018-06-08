const offsetX = 3;
const offsetY = 3;
export const Popover = {
  name: 'Popover',
  props: {
    target: null,
    container: null,
    width: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
    },
  },
  methods: {
    handleDocumentClick(e) {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.$emit('toggle', e);
      }
    },
  },
  created() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  mounted() {
    const {
      bottom,
      left,
      width: targetWidth,
    } = this.target.getBoundingClientRect();
    const { container = document.body, width } = this;
    const popoverWidth = width || this.$el.offsetWidth;
    let x = (left + (targetWidth / 2)) - (popoverWidth / 2);
    const delta = container.offsetWidth - (x + popoverWidth);
    if (delta < 0) {
      x += delta - offsetX;
    }
    this.$el.style.transform = `translate(${x}px, ${bottom + offsetY}px)`;
  },
  render() {
    return (
      <div
        class={{
          popover: true,
          'd-none': !this.visible,
        }}
      >
        <div class="popover-inner">{this.$slots.default}</div>
      </div>
    );
  },
};
