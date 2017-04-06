import React from 'react';

import { SelectAllByAllPagesDemo } from './selection/select-all-by-all-pages';
import { SelectAllByPageDemo } from './selection/select-all-by-page';
import { WithoutSelectAllDemo } from './selection/without-select-all';
import { WithoutCheckboxesDemo } from './selection/without-checkboxes';

export const SelectionDemos = () => (
  <div>
    <h2>Selection Demos</h2>
    <SelectAllByPageDemo />
    <SelectAllByAllPagesDemo />
    <WithoutSelectAllDemo />
    <WithoutCheckboxesDemo />
  </div>
);
