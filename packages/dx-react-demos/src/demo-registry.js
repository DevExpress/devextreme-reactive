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
    'table-cell-template': {
      bootstrap3: require('./bootstrap3/basic/table-cell-template').default,
      'material-ui': require('./material-ui/basic/table-cell-template').default,
    },
    'table-row-template': {
      bootstrap3: require('./bootstrap3/basic/table-row-template').default,
      'material-ui': require('./material-ui/basic/table-row-template').default,
    },
  },
  localization: {
    basic: {
      bootstrap3: require('./bootstrap3/localization/basic').default,
      'material-ui': require('./material-ui/localization/basic').default,
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
      'material-ui': require('./material-ui/featured-virtual-scrolling/demo').default,
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
    'filter-row': {
      bootstrap3: require('./bootstrap3/filtering/filter-row').default,
      'material-ui': require('./material-ui/filtering/filter-row').default,
    },
    'controlled-mode': {
      bootstrap3: require('./bootstrap3/filtering/controlled-mode').default,
      'material-ui': require('./material-ui/filtering/controlled-mode').default,
    },
    'custom-filter-row': {
      bootstrap3: require('./bootstrap3/filtering/custom-filter-row').default,
      'material-ui': require('./material-ui/filtering/custom-filter-row').default,
    },
    'custom-filtering-algorithm': {
      bootstrap3: require('./bootstrap3/filtering/custom-filtering-algorithm').default,
      'material-ui': require('./material-ui/filtering/custom-filtering-algorithm').default,
    },
    'remote-filtering': {
      bootstrap3: require('./bootstrap3/filtering/remote-filtering').default,
      'material-ui': require('./material-ui/filtering/remote-filtering').default,
    },
  },
  grouping: {
    static: {
      bootstrap3: require('./bootstrap3/grouping/static').default,
      'material-ui': require('./material-ui/grouping/static').default,
    },
    'custom-grouping-static': {
      bootstrap3: require('./bootstrap3/grouping/custom-grouping-static').default,
      'material-ui': require('./material-ui/grouping/custom-grouping-static').default,
    },
    'grouping-with-ui': {
      bootstrap3: require('./bootstrap3/grouping/grouping-with-ui').default,
      'material-ui': require('./material-ui/grouping/grouping-with-ui').default,
    },
    'controlled-mode': {
      bootstrap3: require('./bootstrap3/grouping/controlled-mode').default,
      'material-ui': require('./material-ui/grouping/controlled-mode').default,
    },
    custom: {
      bootstrap3: require('./bootstrap3/grouping/custom').default,
      'material-ui': require('./material-ui/grouping/custom').default,
    },
    'custom-advanced': {
      bootstrap3: require('./bootstrap3/grouping/custom-advanced').default,
      'material-ui': require('./material-ui/grouping/custom-advanced').default,
    },
    'remote-grouping-with-local-expanding': {
      bootstrap3: require('./bootstrap3/grouping/remote-grouping-with-local-expanding').default,
      'material-ui': require('./material-ui/grouping/remote-grouping-with-local-expanding').default,
    },
  },
  immutability: {
    'seamless-immutable': {
      bootstrap3: require('./bootstrap3/immutability/seamless-immutable').default,
      'material-ui': require('./material-ui/immutability/seamless-immutable').default,
    },
  },
  paging: {
    'uncontrolled-mode': {
      bootstrap3: require('./bootstrap3/paging/uncontrolled-mode').default,
      'material-ui': require('./material-ui/paging/uncontrolled-mode').default,
    },
    'page-size-selector': {
      bootstrap3: require('./bootstrap3/paging/page-size-selector').default,
      'material-ui': require('./material-ui/paging/page-size-selector').default,
    },
    'controlled-mode': {
      bootstrap3: require('./bootstrap3/paging/controlled-mode').default,
      'material-ui': require('./material-ui/paging/controlled-mode').default,
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
      'material-ui': require('./material-ui/selection/select-all-virtual').default,
    },
    'select-all-by-page': {
      bootstrap3: require('./bootstrap3/selection/select-all-by-page').default,
      'material-ui': require('./material-ui/selection/select-all-by-page').default,
    },
    'select-all-by-all-pages': {
      bootstrap3: require('./bootstrap3/selection/select-all-by-all-pages').default,
      'material-ui': require('./material-ui/selection/select-all-by-all-pages').default,
    },
  },
  sorting: {
    'header-sorting': {
      bootstrap3: require('./bootstrap3/sorting/header-sorting').default,
      'material-ui': require('./material-ui/sorting/header-sorting').default,
    },
    'group-sorting': {
      bootstrap3: require('./bootstrap3/sorting/group-sorting').default,
      'material-ui': require('./material-ui/sorting/group-sorting').default,
    },
    'controlled-mode': {
      bootstrap3: require('./bootstrap3/sorting/controlled-mode').default,
      'material-ui': require('./material-ui/sorting/controlled-mode').default,
    },
    'custom-sorting': {
      bootstrap3: require('./bootstrap3/sorting/custom-sorting').default,
      'material-ui': require('./material-ui/sorting/custom-sorting').default,
    },
    'remote-sorting': {
      bootstrap3: require('./bootstrap3/sorting/remote-sorting').default,
      'material-ui': require('./material-ui/sorting/remote-sorting').default,
    },
  },
  'virtual-scrolling': {
    basic: {
      bootstrap3: require('./bootstrap3/virtual-scrolling/basic').default,
      'material-ui': require('./material-ui/virtual-scrolling/basic').default,
    },
  },
  'column-chooser': {
    basic: {
      bootstrap3: require('./bootstrap3/column-chooser/basic').default,
      'material-ui': require('./material-ui/column-chooser/basic').default,
    },
  },
};
