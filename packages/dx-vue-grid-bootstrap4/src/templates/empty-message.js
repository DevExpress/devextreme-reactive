export const EmptyMessage = {
  name: 'EmptyMessage',
  props: {
    getMessage: {
      type: Function,
      required: true,
    },
  },
  render() {
    return (
      <div
        class="py-5 text-center"
      >
        <big class="text-muted">
          {this.getMessage('noColumns')}
        </big>
      </div>
    );
  },
};
