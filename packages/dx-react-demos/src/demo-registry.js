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

export const sections = [{
  name: 'basic',
  title: 'Basic',
}, {
  name: 'column-reordering',
  title: 'Column Reordering',
}, {
  name: 'detail-row',
  title: 'Detail Row',
}, {
  name: 'editing',
  title: 'Editing',
}, {
  name: 'featured',
  title: 'Featured',
}, {
  name: 'featured-theming',
  title: 'Featured Theming',
}, {
  name: 'filtering',
  title: 'Filtering',
}, {
  name: 'grouping',
  title: 'Grouping',
}, {
  name: 'immutability',
  title: 'Immutability',
}, {
  name: 'paging',
  title: 'Paging',
}, {
  name: 'selection',
  title: 'Selection',
}, {
  name: 'sorting',
  title: 'Sorting',
}, {
  name: 'virtual-scrolling',
  title: 'Virtual Scrolling',
}];

export const demos = [{
  // basic
  section: 'basic',
  demo: 'basic',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/basic/basic').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/basic/basic').default,
  }],
}, {
  // column-reordering
  section: 'column-reordering',
  demo: 'uncontrolled',
  title: 'Uncontrolled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/column-reordering/uncontrolled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/column-reordering/uncontrolled').default,
  }],
}, {
  section: 'column-reordering',
  demo: 'controlled',
  title: 'Controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/column-reordering/uncontrolled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/column-reordering/uncontrolled').default,
  }],
}, {
  // detail-row
  section: 'detail-row',
  demo: 'simple-detail-row',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/detail-row/simple-detail-row').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/detail-row/simple-detail-row').default,
  }],
}, {
  section: 'detail-row',
  demo: 'detail-row-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/detail-row/detail-row-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/detail-row/detail-row-controlled').default,
  }],
}, {
  // editing
  section: 'editing',
  demo: 'edit-row',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/editing/edit-row').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/editing/edit-row').default,
  }],
}, {
  section: 'editing',
  demo: 'edit-row-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/editing/edit-row-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/editing/edit-row-controlled').default,
  }],
}, {
  // featured
  section: 'featured',
  demo: 'uncontrolled-mode',
  title: 'Uncontrolled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/featured/uncontrolled-mode').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/featured/uncontrolled-mode').default,
  }],
}, {
  section: 'featured',
  demo: 'controlled-mode',
  title: 'Controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/featured/controlled-mode').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/featured/controlled-mode').default,
  }],
}, {
  section: 'featured',
  demo: 'redux-integration',
  title: 'Redux Integration',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/featured/redux-integration').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/featured/redux-integration').default,
  }],
}, {
  section: 'featured',
  demo: 'virtual-scrolling',
  title: 'Virtual Scrolling',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/featured/virtual-scrolling').default,
  }],
}, {
  section: 'featured',
  demo: 'remote-data',
  title: 'Remote Data',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/featured/remote-data').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/featured/remote-data').default,
  }],
}, {
  // featured-theming
  section: 'featured-theming',
  demo: 'theming',
  title: 'Theming',
  themes: [{
    name: 'material-ui',
    Component: require('./material-ui/featured-theming/theming').default,
  }],
}, {
  // filtering
  section: 'filtering',
  demo: 'local-filter-row',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/filtering/local-filter-row').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/filtering/local-filter-row').default,
  }],
}, {
  section: 'filtering',
  demo: 'local-filtering-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/filtering/local-filtering-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/filtering/local-filtering-controlled').default,
  }],
}, {
  section: 'filtering',
  demo: 'custom-filter-row',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/filtering/custom-filter-row').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/filtering/custom-filter-row').default,
  }],
}, {
  // grouping
  section: 'grouping',
  demo: 'local-grouping-static',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/grouping/local-grouping-static').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/grouping/local-grouping-static').default,
  }],
}, {
  section: 'grouping',
  demo: 'local-grouping-with-ui',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/grouping/local-grouping-with-ui').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/grouping/local-grouping-with-ui').default,
  }],
}, {
  section: 'grouping',
  demo: 'local-grouping-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/grouping/local-grouping-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/grouping/local-grouping-controlled').default,
  }],
}, {
  // immutability
  section: 'immutability',
  demo: 'seamless-immutable',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/immutability/seamless-immutable').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/immutability/seamless-immutable').default,
  }],
}, {
  // paging
  section: 'paging',
  demo: 'local-paging',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/paging/local-paging').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/paging/local-paging').default,
  }],
}, {
  section: 'paging',
  demo: 'page-size-selector',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/paging/page-size-selector').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/paging/page-size-selector').default,
  }],
}, {
  section: 'paging',
  demo: 'local-paging-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/paging/local-paging-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/paging/local-paging-controlled').default,
  }],
}, {
  section: 'paging',
  demo: 'remote-paging',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/paging/remote-paging').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/paging/remote-paging').default,
  }],
}, {
  // selection
  section: 'selection',
  demo: 'basic',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/basic').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/basic').default,
  }],
}, {
  section: 'selection',
  demo: 'select-by-row-click',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/select-by-row-click').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/select-by-row-click').default,
  }],
}, {
  section: 'selection',
  demo: 'hidden-checkboxes',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/hidden-checkboxes').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/hidden-checkboxes').default,
  }],
}, {
  section: 'selection',
  demo: 'select-all-virtual',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/select-all-virtual').default,
  }],
}, {
  section: 'selection',
  demo: 'select-all-by-page',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/select-all-by-page').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/select-all-by-page').default,
  }],
}, {
  section: 'selection',
  demo: 'select-all-by-all-pages',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/select-all-by-all-pages').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/select-all-by-all-pages').default,
  }],
}, {
  section: 'selection',
  demo: 'hidden-select-all',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/selection/hidden-select-all').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/selection/hidden-select-all').default,
  }],
}, {
  // sorting
  section: 'sorting',
  demo: 'local-header-sorting',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/sorting/local-header-sorting').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/sorting/local-header-sorting').default,
  }],
}, {
  section: 'sorting',
  demo: 'local-group-sorting',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/sorting/local-group-sorting').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/sorting/local-group-sorting').default,
  }],
}, {
  section: 'sorting',
  demo: 'local-sorting-controlled',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/sorting/local-sorting-controlled').default,
  }, {
    name: 'material-ui',
    Component: require('./material-ui/sorting/local-sorting-controlled').default,
  }],
}, {
  section: 'sorting',
  demo: 'remote-sorting',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/sorting/remote-sorting').default,
  }],
}, {
  // sorting
  section: 'virtual-scrolling',
  demo: 'basic',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/virtual-scrolling/basic').default,
  }],
}, {
  section: 'virtual-scrolling',
  demo: 'integration-with-other-plugins',
  themes: [{
    name: 'bootstrap3',
    Component: require('./bootstrap3/virtual-scrolling/integration-with-other-plugins').default,
  }],
}];
