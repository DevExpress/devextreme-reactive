import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { BasicSelectionDemo } from './selection/basic';
import { SelectByRowClickDemo } from './selection/select-by-row-click';
import { SelectionWithHiddenCheckboxesDemo } from './selection/hidden-checkboxes';
import { SelectAllByPageDemo } from './selection/select-all-by-page';

const AllDemos = () => (
  <div>
    <h2>Selection Demos</h2>
    <h3>Basic Demo</h3>
    <BasicSelectionDemo />
    <h3>Select by Row Click Demo</h3>
    <SelectByRowClickDemo />
    <h3>Selection With Hidden Checkboxes Demo</h3>
    <SelectionWithHiddenCheckboxesDemo />
    <h3>Select All by Page Demo</h3>
    <SelectAllByPageDemo />
  </div>
);

export const SelectionDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/basic`} component={BasicSelectionDemo} />
    <Route path={`${match.url}/select-by-row-click`} component={SelectByRowClickDemo} />
    <Route path={`${match.url}/hidden-checkboxes`} component={SelectionWithHiddenCheckboxesDemo} />
    <Route path={`${match.url}/select-all-by-page`} component={SelectAllByPageDemo} />
  </div>
);
SelectionDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
