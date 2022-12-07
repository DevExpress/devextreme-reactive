import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { Menu } from '@mui/material';
import { FilterSelector, classes } from './filter-selector';

const defaultProps = {
  toggleButtonComponent: () => null,
  iconComponent: () => null,
  getMessage: key => key,
};

describe('FilterSelector', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  it('should not render anything if no values are available', () => {
    const tree = mount(<FilterSelector {...defaultProps} />);

    expect(tree.children())
      .toHaveLength(0);
  });

  it('should render the disabled toggle button if only one value is available', () => {
    const tree = mount((
      <FilterSelector
        {...defaultProps}
        availableValues={['one']}
      />
    ));

    expect(tree.find(defaultProps.toggleButtonComponent).prop('disabled'))
      .toBeTruthy();
  });

  it('should render the disabled toggle button if the "disabled" prop is true', () => {
    const tree = mount((
      <FilterSelector
        {...defaultProps}
        availableValues={['one', 'two']}
        disabled
      />
    ));

    expect(tree.find(defaultProps.toggleButtonComponent).prop('disabled'))
      .toBeTruthy();
  });

  it('should have correct classes', () => {
    const tree = mount((
      <FilterSelector
        {...defaultProps}
        availableValues={['one', 'two']}
      />
    ));

    expect(tree.find(Menu).hasClass(classes.selectMenu))
      .toBeTruthy();
  });
});
