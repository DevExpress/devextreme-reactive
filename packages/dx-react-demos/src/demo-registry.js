/* eslint-disable global-require */

export const themes = [{
  name: 'bootstrap3',
  title: 'Bootstrap 3',
  DemoContainer: require('./bootstrap3/demo-container').default,
}, {
  name: 'material-ui',
  title: 'Material UI',
  DemoContainer: require('./material-ui/demo-container').default,
}];

export const demos = {
  basic: {
    basic: {
      bootstrap3: require('./bootstrap3/basic/basic').default,
      'material-ui': require('./material-ui/basic/basic').default,
    },
  },
  'column-reordering': {
    uncontrolled: {
      bootstrap3: require('./bootstrap3/column-reordering/uncontrolled').default,
      'material-ui': require('./material-ui/column-reordering/uncontrolled').default,
    },
    controlled: {
      bootstrap3: require('./bootstrap3/column-reordering/controlled').default,
      'material-ui': require('./material-ui/column-reordering/controlled').default,
    },
  },
  'column-resizing': {
    uncontrolled: {
      bootstrap3: require('./bootstrap3/column-resizing/uncontrolled').default,
      'material-ui': require('./material-ui/column-resizing/uncontrolled').default,
    },
    controlled: {
      bootstrap3: require('./bootstrap3/column-resizing/controlled').default,
      'material-ui': require('./material-ui/column-resizing/controlled').default,
    },
  },
  'data-accessors': {
    'custom-data-accessors': {
      bootstrap3: require('./bootstrap3/data-accessors/custom-data-accessors').default,
      'material-ui': require('./material-ui/data-accessors/custom-data-accessors').default,
    },
    'custom-data-accessors-in-columns': {
      bootstrap3: require('./bootstrap3/data-accessors/custom-data-accessors-in-columns').default,
      'material-ui': require('./material-ui/data-accessors/custom-data-accessors-in-columns').default,
    },
  },
  'data-types': {
    formatters: {
      bootstrap3: require('./bootstrap3/data-types/formatters').default,
      'material-ui': require('./material-ui/data-types/formatters').default,
    },
    editors: {
      bootstrap3: require('./bootstrap3/data-types/editors').default,
      'material-ui': require('./material-ui/data-types/editors').default,
    },
  },
  'detail-row': {
    'simple-detail-row': {
      bootstrap3: require('./bootstrap3/detail-row/simple-detail-row').default,
      'material-ui': require('./material-ui/detail-row/simple-detail-row').default,
    },
    'detail-row-controlled': {
      bootstrap3: require('./bootstrap3/detail-row/detail-row-controlled').default,
      'material-ui': require('./material-ui/detail-row/detail-row-controlled').default,
    },
  },
  editing: {
    'edit-row': {
      bootstrap3: require('./bootstrap3/editing/edit-row').default,
      'material-ui': require('./material-ui/editing/edit-row').default,
    },
    'edit-row-controlled': {
      bootstrap3: require('./bootstrap3/editing/edit-row-controlled').default,
      'material-ui': require('./material-ui/editing/edit-row-controlled').default,
    },
  },
  'featured-uncontrolled-mode': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-uncontrolled-mode/demo').default,
      'material-ui': require('./material-ui/featured-uncontrolled-mode/demo').default,
    },
  },
  'featured-controlled-mode': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-controlled-mode/demo').default,
      'material-ui': require('./material-ui/featured-controlled-mode/demo').default,
    },
  },
  'featured-redux-integration': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-redux-integration/demo').default,
      'material-ui': require('./material-ui/featured-redux-integration/demo').default,
    },
  },
  'featured-virtual-scrolling': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-virtual-scrolling/demo').default,
    },
  },
  'featured-remote-data': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-remote-data/demo').default,
      'material-ui': require('./material-ui/featured-remote-data/demo').default,
    },
  },
  'featured-theming': {
    demo: {
      bootstrap3: require('./bootstrap3/featured-theming/demo-frame').default,
      'material-ui': require('./material-ui/featured-theming/demo-frame').default,
    },
    '_embedded-demo': {
      bootstrap3: require('./bootstrap3/featured-theming/demo').default,
      'material-ui': require('./material-ui/featured-theming/demo').default,
    },
  },
  filtering: {
    'local-filter-row': {
      bootstrap3: require('./bootstrap3/filtering/local-filter-row').default,
      'material-ui': require('./material-ui/filtering/local-filter-row').default,
    },
    'local-filtering-controlled': {
      bootstrap3: require('./bootstrap3/filtering/local-filtering-controlled').default,
      'material-ui': require('./material-ui/filtering/local-filtering-controlled').default,
    },
    'custom-filter-row': {
      bootstrap3: require('./bootstrap3/filtering/custom-filter-row').default,
      'material-ui': require('./material-ui/filtering/custom-filter-row').default,
    },
  },
  grouping: {
    'local-grouping-static': {
      bootstrap3: require('./bootstrap3/grouping/local-grouping-static').default,
      'material-ui': require('./material-ui/grouping/local-grouping-static').default,
    },
    'local-grouping-with-ui': {
      bootstrap3: require('./bootstrap3/grouping/local-grouping-with-ui').default,
      'material-ui': require('./material-ui/grouping/local-grouping-with-ui').default,
    },
    'local-grouping-controlled': {
      bootstrap3: require('./bootstrap3/grouping/local-grouping-controlled').default,
      'material-ui': require('./material-ui/grouping/local-grouping-controlled').default,
    },
  },
  immutability: {
    'seamless-immutable': {
      bootstrap3: require('./bootstrap3/immutability/seamless-immutable').default,
      'material-ui': require('./material-ui/immutability/seamless-immutable').default,
    },
  },
  paging: {
    'local-paging': {
      bootstrap3: require('./bootstrap3/paging/local-paging').default,
      'material-ui': require('./material-ui/paging/local-paging').default,
    },
    'page-size-selector': {
      bootstrap3: require('./bootstrap3/paging/page-size-selector').default,
      'material-ui': require('./material-ui/paging/page-size-selector').default,
    },
    'local-paging-controlled': {
      bootstrap3: require('./bootstrap3/paging/local-paging-controlled').default,
      'material-ui': require('./material-ui/paging/local-paging-controlled').default,
    },
    'remote-paging': {
      bootstrap3: require('./bootstrap3/paging/remote-paging').default,
      'material-ui': require('./material-ui/paging/remote-paging').default,
    },
  },
  selection: {
    basic: {
      bootstrap3: require('./bootstrap3/selection/basic').default,
      'material-ui': require('./material-ui/selection/basic').default,
    },
    'select-by-row-click': {
      bootstrap3: require('./bootstrap3/selection/select-by-row-click').default,
      'material-ui': require('./material-ui/selection/select-by-row-click').default,
    },
    'hidden-checkboxes': {
      bootstrap3: require('./bootstrap3/selection/hidden-checkboxes').default,
      'material-ui': require('./material-ui/selection/hidden-checkboxes').default,
    },
    'select-all-virtual': {
      bootstrap3: require('./bootstrap3/selection/select-all-virtual').default,
    },
    'select-all-by-page': {
      bootstrap3: require('./bootstrap3/selection/select-all-by-page').default,
      'material-ui': require('./material-ui/selection/select-all-by-page').default,
    },
    'select-all-by-all-pages': {
      bootstrap3: require('./bootstrap3/selection/select-all-by-all-pages').default,
      'material-ui': require('./material-ui/selection/select-all-by-all-pages').default,
    },
    'hidden-select-all': {
      bootstrap3: require('./bootstrap3/selection/hidden-select-all').default,
      'material-ui': require('./material-ui/selection/hidden-select-all').default,
    },
  },
  sorting: {
    'local-header-sorting': {
      bootstrap3: require('./bootstrap3/sorting/local-header-sorting').default,
      'material-ui': require('./material-ui/sorting/local-header-sorting').default,
    },
    'local-group-sorting': {
      bootstrap3: require('./bootstrap3/sorting/local-group-sorting').default,
      'material-ui': require('./material-ui/sorting/local-group-sorting').default,
    },
    'local-sorting-controlled': {
      bootstrap3: require('./bootstrap3/sorting/local-sorting-controlled').default,
      'material-ui': require('./material-ui/sorting/local-sorting-controlled').default,
    },
    'remote-sorting': {
      bootstrap3: require('./bootstrap3/sorting/remote-sorting').default,
    },
  },
  'virtual-scrolling': {
    basic: {
      bootstrap3: require('./bootstrap3/virtual-scrolling/basic').default,
    },
    'integration-with-other-plugins': {
      bootstrap3: require('./bootstrap3/virtual-scrolling/integration-with-other-plugins').default,
    },
  },
};
