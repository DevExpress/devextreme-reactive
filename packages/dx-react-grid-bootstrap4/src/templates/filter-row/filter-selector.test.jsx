import * as React from 'react';
import { shallow } from 'enzyme';
import { FilterSelector } from './filter-selector';

const defaultProps = {
  toggleButtonComponent: () => null,
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

  it('should pass className to the root element', () => {
    const tree = shallow((
      <FilterSelector
        {...defaultProps}
        availableValues={['one']}
        className="custom"
      />
    ));

    expect(tree.is('.custom.input-group-prepend')).toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <FilterSelector
        {...defaultProps}
        availableValues={['one']}
        style={{ backgroundColor: 'red' }}
      />
    ));

    expect(tree.props().style).toMatchObject({
      backgroundColor: 'red',
    });
  });
});
