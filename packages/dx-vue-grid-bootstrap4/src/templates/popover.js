export const Popover = {
  name: 'Popover',
  props: {
    target: null,
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
      width,
    } = this.target.getBoundingClientRect();

    const bodyWidth = document.body.offsetWidth;
    const popoverWidth = this.$el.offsetWidth;
    let x = (left + (width / 2)) - (popoverWidth / 2);
    const delta = bodyWidth - (x + popoverWidth);
    if (delta < 0) {
      x += delta;
    }
    this.$el.style.transform = `translate(${x}px, ${bottom}px)`;
  },
  render() {
    return (
      <div
        class={{
          'popover bs-popover-bottom': true,
          'd-none': !this.visible,
        }}
      >
        <div class="popover-inner">{this.$slots.default}</div>
      </div>
    );
  },
};
