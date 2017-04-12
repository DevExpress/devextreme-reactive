import React from 'react';
import { Route } from 'react-router-dom';

import { BasicSelectionDemo } from './selection/basic';
import { SelectByRowClickDemo } from './selection/select-by-row-click';
import { SelectionWithHiddenCheckboxesDemo } from './selection/hidden-checkboxes';
import { SelectAllVirtualDemo } from './selection/select-all-virtual';
import { SelectAllByPageDemo } from './selection/select-all-by-page';
import { SelectAllByAllPagesDemo } from './selection/select-all-by-all-pages';
import { SelectionWithHiddenSelectAllDemo } from './selection/hidden-select-all';

const AllDemos = () => (
  <div>
    <h2>Selection Demos</h2>
    <h3>Basic Demo</h3>
    <BasicSelectionDemo />
    <h3>Select by Row Click Demo</h3>
    <SelectByRowClickDemo />
    <h3>Selection With Hidden Checkboxes Demo</h3>
    <SelectionWithHiddenCheckboxesDemo />
    <h3>Select All Virtual Demo</h3>
    <SelectAllVirtualDemo />
    <h3>Select All by Page Demo</h3>
    <SelectAllByPageDemo />
    <h3>Select All by All Pages Demo</h3>
    <SelectAllByAllPagesDemo />
    <h3>Selection w/o Select All Demo</h3>
    <SelectionWithHiddenSelectAllDemo />
  </div>
);

export const SelectionDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/basic`} component={BasicSelectionDemo} />
    <Route path={`${match.url}/select-by-row-click`} component={SelectByRowClickDemo} />
    <Route path={`${match.url}/hidden-checkboxes`} component={SelectionWithHiddenCheckboxesDemo} />
    <Route path={`${match.url}/select-all-virtual`} component={SelectAllVirtualDemo} />
    <Route path={`${match.url}/select-all-by-page`} component={SelectAllByPageDemo} />
    <Route path={`${match.url}/select-all-by-all-pages`} component={SelectAllByAllPagesDemo} />
    <Route path={`${match.url}/hidden-select-all`} component={SelectionWithHiddenSelectAllDemo} />
  </div>
);
SelectionDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
