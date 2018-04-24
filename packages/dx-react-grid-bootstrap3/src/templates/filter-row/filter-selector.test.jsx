import * as React from 'react';
import { shallow } from 'enzyme';
import { FilterSelector } from './filter-selector';

const defaultProps = {
  iconComponent: () => null,
  getMessage: key => key,
};

describe('FilterSelector', () => {
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

    expect(tree.find('button').prop('disabled'))
      .toBeTruthy();
  });
});
