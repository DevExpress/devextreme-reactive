export const Popover = {
  name: 'Popover',
  props: {
    target: null,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClick(e) {
      if (
        e.target === this.target ||
        this.target.contains(e.target)
      ) {
        this.visible = !this.visible;
      } else if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.visible = false;
      }
    },
  },
  created() {
    document.addEventListener('click', this.handleClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClick);
  },
  updated() {
    const {
      bottom,
      left,
      width,
    } = this.target.getBoundingClientRect();

    const x = (left + (width / 2)) - (this.$el.offsetWidth / 2);
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
        <div class="arrow" style="left: 50%; margin-left: -8px;" />
        <div class="popover-body">{this.$slots.default}</div>
      </div>
    );
  },
};
