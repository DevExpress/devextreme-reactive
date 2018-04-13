import '../../../../dx-vue-grid-bootstrap4/dist/dx-vue-grid-bootstrap4.css';

export default {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css" />
        {this.$slots.default}
      </div>
    );
  },
};
