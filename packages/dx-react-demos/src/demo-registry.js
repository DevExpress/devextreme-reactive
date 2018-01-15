/* globals preval */
/* eslint-disable global-require */

export const demos = {
  basic: {
    basic: {
      bootstrap3: {
        demo: require('./bootstrap3/basic/basic').default,
        source: preval.require('./demo-source-reader', './bootstrap3/basic/basic'),
      },
      'material-ui': {
        demo: require('./material-ui/basic/basic').default,
        source: preval.require('./demo-source-reader', './material-ui/basic/basic'),
      },
    },
    'table-cell-template': {
      bootstrap3: {
        demo: require('./bootstrap3/basic/table-cell-template').default,
        source: preval.require('./demo-source-reader', './bootstrap3/basic/table-cell-template'),
      },
      'material-ui': {
        demo: require('./material-ui/basic/table-cell-template').default,
        source: preval.require('./demo-source-reader', './material-ui/basic/table-cell-template'),
      },
    },
    'table-row-template': {
      bootstrap3: {
        demo: require('./bootstrap3/basic/table-row-template').default,
        source: preval.require('./demo-source-reader', './bootstrap3/basic/table-row-template'),
      },
      'material-ui': {
        demo: require('./material-ui/basic/table-row-template').default,
        source: preval.require('./demo-source-reader', './material-ui/basic/table-row-template'),
      },
    },
  },
  localization: {
    basic: {
      bootstrap3: {
        demo: require('./bootstrap3/localization/basic').default,
        source: preval.require('./demo-source-reader', './bootstrap3/localization/basic'),
      },
      'material-ui': {
        demo: require('./material-ui/localization/basic').default,
        source: preval.require('./demo-source-reader', './material-ui/localization/basic'),
      },
    },
  },
  'column-reordering': {
    uncontrolled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-reordering/uncontrolled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-reordering/uncontrolled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-reordering/uncontrolled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-reordering/uncontrolled'),
      },
    },
    controlled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-reordering/controlled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-reordering/controlled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-reordering/controlled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-reordering/controlled'),
      },
    },
  },
  'column-resizing': {
    uncontrolled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-resizing/uncontrolled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-resizing/uncontrolled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-resizing/uncontrolled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-resizing/uncontrolled'),
      },
    },
    controlled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-resizing/controlled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-resizing/controlled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-resizing/controlled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-resizing/controlled'),
      },
    },
  },
  'data-accessors': {
    'value-setters': {
      bootstrap3: {
        demo: require('./bootstrap3/data-accessors/value-setters').default,
        source: preval.require('./demo-source-reader', './bootstrap3/data-accessors/value-setters'),
      },
      'material-ui': {
        demo: require('./material-ui/data-accessors/value-setters').default,
        source: preval.require('./demo-source-reader', './material-ui/data-accessors/value-setters'),
      },
    },
    'value-getters': {
      bootstrap3: {
        demo: require('./bootstrap3/data-accessors/value-getters').default,
        source: preval.require('./demo-source-reader', './bootstrap3/data-accessors/value-getters'),
      },
      'material-ui': {
        demo: require('./material-ui/data-accessors/value-getters').default,
        source: preval.require('./demo-source-reader', './material-ui/data-accessors/value-getters'),
      },
    },
  },
  'data-types': {
    formatters: {
      bootstrap3: {
        demo: require('./bootstrap3/data-types/formatters').default,
        source: preval.require('./demo-source-reader', './bootstrap3/data-types/formatters'),
      },
      'material-ui': {
        demo: require('./material-ui/data-types/formatters').default,
        source: preval.require('./demo-source-reader', './material-ui/data-types/formatters'),
      },
    },
    editors: {
      bootstrap3: {
        demo: require('./bootstrap3/data-types/editors').default,
        source: preval.require('./demo-source-reader', './bootstrap3/data-types/editors'),
      },
      'material-ui': {
        demo: require('./material-ui/data-types/editors').default,
        source: preval.require('./demo-source-reader', './material-ui/data-types/editors'),
      },
    },
  },
  'detail-row': {
    'simple-detail-row': {
      bootstrap3: {
        demo: require('./bootstrap3/detail-row/simple-detail-row').default,
        source: preval.require('./demo-source-reader', './bootstrap3/detail-row/simple-detail-row'),
      },
      'material-ui': {
        demo: require('./material-ui/detail-row/simple-detail-row').default,
        source: preval.require('./demo-source-reader', './material-ui/detail-row/simple-detail-row'),
      },
    },
    'detail-row-controlled': {
      bootstrap3: {
        demo: require('./bootstrap3/detail-row/detail-row-controlled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/detail-row/detail-row-controlled'),
      },
      'material-ui': {
        demo: require('./material-ui/detail-row/detail-row-controlled').default,
        source: preval.require('./demo-source-reader', './material-ui/detail-row/detail-row-controlled'),
      },
    },
  },
  editing: {
    'edit-row': {
      bootstrap3: {
        demo: require('./bootstrap3/editing/edit-row').default,
        source: preval.require('./demo-source-reader', './bootstrap3/editing/edit-row'),
      },
      'material-ui': {
        demo: require('./material-ui/editing/edit-row').default,
        source: preval.require('./demo-source-reader', './material-ui/editing/edit-row'),
      },
    },
    'edit-row-controlled': {
      bootstrap3: {
        demo: require('./bootstrap3/editing/edit-row-controlled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/editing/edit-row-controlled'),
      },
      'material-ui': {
        demo: require('./material-ui/editing/edit-row-controlled').default,
        source: preval.require('./demo-source-reader', './material-ui/editing/edit-row-controlled'),
      },
    },
  },
  'featured-uncontrolled-mode': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-uncontrolled-mode/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-uncontrolled-mode/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-uncontrolled-mode/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-uncontrolled-mode/demo'),
      },
    },
  },
  'featured-controlled-mode': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-controlled-mode/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-controlled-mode/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-controlled-mode/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-controlled-mode/demo'),
      },
    },
  },
  'featured-redux-integration': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-redux-integration/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-redux-integration/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-redux-integration/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-redux-integration/demo'),
      },
    },
  },
  'featured-virtual-scrolling': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-virtual-scrolling/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-virtual-scrolling/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-virtual-scrolling/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-virtual-scrolling/demo'),
      },
    },
  },
  'featured-remote-data': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-remote-data/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-remote-data/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-remote-data/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-remote-data/demo'),
      },
    },
  },
  'featured-theming': {
    demo: {
      bootstrap3: {
        demo: require('./bootstrap3/featured-theming/demo').default,
        source: preval.require('./demo-source-reader', './bootstrap3/featured-theming/demo'),
      },
      'material-ui': {
        demo: require('./material-ui/featured-theming/demo').default,
        source: preval.require('./demo-source-reader', './material-ui/featured-theming/demo'),
      },
    },
  },
  filtering: {
    'filter-row': {
      bootstrap3: {
        demo: require('./bootstrap3/filtering/filter-row').default,
        source: preval.require('./demo-source-reader', './bootstrap3/filtering/filter-row'),
      },
      'material-ui': {
        demo: require('./material-ui/filtering/filter-row').default,
        source: preval.require('./demo-source-reader', './material-ui/filtering/filter-row'),
      },
    },
    'controlled-mode': {
      bootstrap3: {
        demo: require('./bootstrap3/filtering/controlled-mode').default,
        source: preval.require('./demo-source-reader', './bootstrap3/filtering/controlled-mode'),
      },
      'material-ui': {
        demo: require('./material-ui/filtering/controlled-mode').default,
        source: preval.require('./demo-source-reader', './material-ui/filtering/controlled-mode'),
      },
    },
    'custom-filter-row': {
      bootstrap3: {
        demo: require('./bootstrap3/filtering/custom-filter-row').default,
        source: preval.require('./demo-source-reader', './bootstrap3/filtering/custom-filter-row'),
      },
      'material-ui': {
        demo: require('./material-ui/filtering/custom-filter-row').default,
        source: preval.require('./demo-source-reader', './material-ui/filtering/custom-filter-row'),
      },
    },
    'custom-filtering-algorithm': {
      bootstrap3: {
        demo: require('./bootstrap3/filtering/custom-filtering-algorithm').default,
        source: preval.require('./demo-source-reader', './bootstrap3/filtering/custom-filtering-algorithm'),
      },
      'material-ui': {
        demo: require('./material-ui/filtering/custom-filtering-algorithm').default,
        source: preval.require('./demo-source-reader', './material-ui/filtering/custom-filtering-algorithm'),
      },
    },
    'remote-filtering': {
      bootstrap3: {
        demo: require('./bootstrap3/filtering/remote-filtering').default,
        source: preval.require('./demo-source-reader', './bootstrap3/filtering/remote-filtering'),
      },
      'material-ui': {
        demo: require('./material-ui/filtering/remote-filtering').default,
        source: preval.require('./demo-source-reader', './material-ui/filtering/remote-filtering'),
      },
    },
  },
  grouping: {
    static: {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/static').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/static'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/static').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/static'),
      },
    },
    'custom-grouping-static': {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/custom-grouping-static').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/custom-grouping-static'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/custom-grouping-static').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/custom-grouping-static'),
      },
    },
    'grouping-with-ui': {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/grouping-with-ui').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/grouping-with-ui'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/grouping-with-ui').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/grouping-with-ui'),
      },
    },
    'controlled-mode': {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/controlled-mode').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/controlled-mode'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/controlled-mode').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/controlled-mode'),
      },
    },
    custom: {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/custom').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/custom'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/custom').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/custom'),
      },
    },
    'custom-advanced': {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/custom-advanced').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/custom-advanced'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/custom-advanced').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/custom-advanced'),
      },
    },
    'remote-grouping-with-local-expanding': {
      bootstrap3: {
        demo: require('./bootstrap3/grouping/remote-grouping-with-local-expanding').default,
        source: preval.require('./demo-source-reader', './bootstrap3/grouping/remote-grouping-with-local-expanding'),
      },
      'material-ui': {
        demo: require('./material-ui/grouping/remote-grouping-with-local-expanding').default,
        source: preval.require('./demo-source-reader', './material-ui/grouping/remote-grouping-with-local-expanding'),
      },
    },
  },
  immutability: {
    'seamless-immutable': {
      bootstrap3: {
        demo: require('./bootstrap3/immutability/seamless-immutable').default,
        source: preval.require('./demo-source-reader', './bootstrap3/immutability/seamless-immutable'),
      },
      'material-ui': {
        demo: require('./material-ui/immutability/seamless-immutable').default,
        source: preval.require('./demo-source-reader', './material-ui/immutability/seamless-immutable'),
      },
    },
  },
  paging: {
    'uncontrolled-mode': {
      bootstrap3: {
        demo: require('./bootstrap3/paging/uncontrolled-mode').default,
        source: preval.require('./demo-source-reader', './bootstrap3/paging/uncontrolled-mode'),
      },
      'material-ui': {
        demo: require('./material-ui/paging/uncontrolled-mode').default,
        source: preval.require('./demo-source-reader', './material-ui/paging/uncontrolled-mode'),
      },
    },
    'page-size-selector': {
      bootstrap3: {
        demo: require('./bootstrap3/paging/page-size-selector').default,
        source: preval.require('./demo-source-reader', './bootstrap3/paging/page-size-selector'),
      },
      'material-ui': {
        demo: require('./material-ui/paging/page-size-selector').default,
        source: preval.require('./demo-source-reader', './material-ui/paging/page-size-selector'),
      },
    },
    'controlled-mode': {
      bootstrap3: {
        demo: require('./bootstrap3/paging/controlled-mode').default,
        source: preval.require('./demo-source-reader', './bootstrap3/paging/controlled-mode'),
      },
      'material-ui': {
        demo: require('./material-ui/paging/controlled-mode').default,
        source: preval.require('./demo-source-reader', './material-ui/paging/controlled-mode'),
      },
    },
    'remote-paging': {
      bootstrap3: {
        demo: require('./bootstrap3/paging/remote-paging').default,
        source: preval.require('./demo-source-reader', './bootstrap3/paging/remote-paging'),
      },
      'material-ui': {
        demo: require('./material-ui/paging/remote-paging').default,
        source: preval.require('./demo-source-reader', './material-ui/paging/remote-paging'),
      },
    },
  },
  selection: {
    basic: {
      bootstrap3: {
        demo: require('./bootstrap3/selection/basic').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/basic'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/basic').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/basic'),
      },
    },
    'select-by-row-click': {
      bootstrap3: {
        demo: require('./bootstrap3/selection/select-by-row-click').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/select-by-row-click'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/select-by-row-click').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/select-by-row-click'),
      },
    },
    'hidden-checkboxes': {
      bootstrap3: {
        demo: require('./bootstrap3/selection/hidden-checkboxes').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/hidden-checkboxes'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/hidden-checkboxes').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/hidden-checkboxes'),
      },
    },
    'select-all-virtual': {
      bootstrap3: {
        demo: require('./bootstrap3/selection/select-all-virtual').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/select-all-virtual'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/select-all-virtual').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/select-all-virtual'),
      },
    },
    'select-all-by-page': {
      bootstrap3: {
        demo: require('./bootstrap3/selection/select-all-by-page').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/select-all-by-page'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/select-all-by-page').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/select-all-by-page'),
      },
    },
    'select-all-by-all-pages': {
      bootstrap3: {
        demo: require('./bootstrap3/selection/select-all-by-all-pages').default,
        source: preval.require('./demo-source-reader', './bootstrap3/selection/select-all-by-all-pages'),
      },
      'material-ui': {
        demo: require('./material-ui/selection/select-all-by-all-pages').default,
        source: preval.require('./demo-source-reader', './material-ui/selection/select-all-by-all-pages'),
      },
    },
  },
  sorting: {
    'header-sorting': {
      bootstrap3: {
        demo: require('./bootstrap3/sorting/header-sorting').default,
        source: preval.require('./demo-source-reader', './bootstrap3/sorting/header-sorting'),
      },
      'material-ui': {
        demo: require('./material-ui/sorting/header-sorting').default,
        source: preval.require('./demo-source-reader', './material-ui/sorting/header-sorting'),
      },
    },
    'group-sorting': {
      bootstrap3: {
        demo: require('./bootstrap3/sorting/group-sorting').default,
        source: preval.require('./demo-source-reader', './bootstrap3/sorting/group-sorting'),
      },
      'material-ui': {
        demo: require('./material-ui/sorting/group-sorting').default,
        source: preval.require('./demo-source-reader', './material-ui/sorting/group-sorting'),
      },
    },
    'controlled-mode': {
      bootstrap3: {
        demo: require('./bootstrap3/sorting/controlled-mode').default,
        source: preval.require('./demo-source-reader', './bootstrap3/sorting/controlled-mode'),
      },
      'material-ui': {
        demo: require('./material-ui/sorting/controlled-mode').default,
        source: preval.require('./demo-source-reader', './material-ui/sorting/controlled-mode'),
      },
    },
    'custom-sorting': {
      bootstrap3: {
        demo: require('./bootstrap3/sorting/custom-sorting').default,
        source: preval.require('./demo-source-reader', './bootstrap3/sorting/custom-sorting'),
      },
      'material-ui': {
        demo: require('./material-ui/sorting/custom-sorting').default,
        source: preval.require('./demo-source-reader', './material-ui/sorting/custom-sorting'),
      },
    },
    'remote-sorting': {
      bootstrap3: {
        demo: require('./bootstrap3/sorting/remote-sorting').default,
        source: preval.require('./demo-source-reader', './bootstrap3/sorting/remote-sorting'),
      },
      'material-ui': {
        demo: require('./material-ui/sorting/remote-sorting').default,
        source: preval.require('./demo-source-reader', './material-ui/sorting/remote-sorting'),
      },
    },
  },
  'virtual-scrolling': {
    basic: {
      bootstrap3: {
        demo: require('./bootstrap3/virtual-scrolling/basic').default,
        source: preval.require('./demo-source-reader', './bootstrap3/virtual-scrolling/basic'),
      },
      'material-ui': {
        demo: require('./material-ui/virtual-scrolling/basic').default,
        source: preval.require('./demo-source-reader', './material-ui/virtual-scrolling/basic'),
      },
    },
  },
  'column-chooser': {
    controlled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-chooser/controlled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-chooser/controlled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-chooser/controlled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-chooser/controlled'),
      },
    },
    uncontrolled: {
      bootstrap3: {
        demo: require('./bootstrap3/column-chooser/uncontrolled').default,
        source: preval.require('./demo-source-reader', './bootstrap3/column-chooser/uncontrolled'),
      },
      'material-ui': {
        demo: require('./material-ui/column-chooser/uncontrolled').default,
        source: preval.require('./demo-source-reader', './material-ui/column-chooser/uncontrolled'),
      },
    },
  },
};
