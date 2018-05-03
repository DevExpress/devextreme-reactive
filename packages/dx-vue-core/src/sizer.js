const styles = {
  root: {
    position: 'relative',
  },
  triggers: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
    visibility: 'hidden',
    opacity: 0,
  },
  expand: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contract: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contractTrigger: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%',
  },
};

export const Sizer = {
  name: 'Sizer',
  data() {
    return {
      size: { width: 0, height: 0 },
    };
  },
  mounted() {
    this.setupListeners();
  },
  methods: {
    setupListeners() {
      const size = { height: this.$refs['sizer-root'].offsetHeight, width: this.$refs['sizer-root'].offsetWidth };

      this.$refs['sizer-contract'].scrollTop = size.height;
      this.$refs['sizer-contract'].scrollLeft = size.width;

      this.$refs['sizer-expandTrigger'].style.width = `${size.width + 1}px`;
      this.$refs['sizer-expandTrigger'].style.height = `${size.height + 1}px`;
      // this.expand.scrollTop = 1;
      // this.expand.scrollLeft = 1;
      this.$refs['sizer-expand'].scrollTop = 1;
      this.$refs['sizer-expand'].scrollLeft = 1;

      this.size = size;
      // this.setState({ size });
    },
  },
  render() {
    const { size } = this;
    // const { children } = this.props;
    return (
      <div
        // ref={(node) => { this.root = node; }}
        ref="sizer-root"
        style={styles.root}
      >
        {/* {children(size)} */}
        {/* {this.$slots.default} */}
        <div style={styles.triggers}>
          <div
            // ref={(node) => { this.expand = node; }}
            ref="sizer-expand"
            style={styles.expand}
            onScroll={this.setupListeners}
          >
            <div
              // ref={(node) => { this.expandTrigger = node; }}
              ref="sizer-expandTrigger"
            />
          </div>
          <div
            // ref={(node) => { this.contract = node; }}
            ref="sizer-contract"
            style={styles.contract}
            onScroll={this.setupListeners}
          >
            <div
              style={styles.contractTrigger}
            />
          </div>
        </div>
      </div>
    );
  },
};
