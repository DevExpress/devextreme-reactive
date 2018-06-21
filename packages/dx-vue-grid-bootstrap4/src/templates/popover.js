const offsetX = 5;
const offsetY = 5;
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
    setElementTranslate() {
      const {
        height: targetHeight,
        width: targetWidth,
        left: targetLeft,
      } = this.target.getBoundingClientRect();
      const { container = document.body, width } = this;
      const popoverWidth = width || this.$el.offsetWidth;
      let x = (targetWidth - popoverWidth) / 2;
      const popoverRight = targetLeft + ((targetWidth + popoverWidth) / 2);
      if (popoverRight > container.offsetWidth) {
        x -= (popoverRight - container.offsetWidth) + offsetX;
      }
      if ((targetLeft - Math.abs(x)) < 0) {
        x = offsetX - targetLeft;
      }
      this.$el.style.transform = `translate(${x}px, ${targetHeight + offsetY}px)`;
    },
  },
  created() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  mounted() {
    this.setElementTranslate();
  },
  updated() {
    this.setElementTranslate();
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
