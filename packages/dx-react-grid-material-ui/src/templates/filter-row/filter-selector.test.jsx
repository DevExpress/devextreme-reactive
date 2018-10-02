import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { FilterSelector } from './filter-selector';

const defaultProps = {
  toggleButtonComponent: () => null,
  iconComponent: () => null,
  getMessage: key => key,
};

describe('FilterSelector', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  it('should not render anything if no values are available', () => {
    const tree = shallow(<FilterSelector {...defaultProps} />);

    expect(tree.children())
      .toHaveLength(0);
  });

  it('should render the disabled toggle button if only one value is available', () => {
    const tree = shallow((
      <FilterSelector
        {...defaultProps}
        availableValues={['one']}
      />
    ));

    expect(tree.find(defaultProps.toggleButtonComponent).prop('disabled'))
      .toBeTruthy();
  });

  it('should render the disabled toggle button if the "disabled" prop is true', () => {
    const tree = shallow((
      <FilterSelector
        {...defaultProps}
        availableValues={['one', 'two']}
        disabled
      />
    ));

    expect(tree.find(defaultProps.toggleButtonComponent).prop('disabled'))
      .toBeTruthy();
  });
});
