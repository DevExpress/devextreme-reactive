import { shallow } from '@vue/test-utils';
import { FilterSelector } from './filter-selector';

const defaultProps = {
  iconComponent: { name: 'Icon', render() { return null; } },
  getMessage: key => key,
};

describe('FilterSelector', () => {
  it('should not render anything if no values are available', () => {
    const tree = shallow(({
      render() {
        return (
          <FilterSelector {...{ attrs: { ...defaultProps } }} />
        );
      },
    }));

    expect(tree.find('.input-group-prepend'))
      .toBeTruthy();
  });

  it('should render the disabled toggle button if only one value is available', () => {
    const tree = shallow(({
      render() {
        return (
          <FilterSelector
            {...{ attrs: { ...defaultProps } }}
            availableValues={['one']}
          />
        );
      },
    }));

    expect(tree.find('button').element.disabled)
      .toBeTruthy();
  });

  it('should render the disabled toggle button if the "disabled" prop is true', () => {
    const tree = shallow(({
      render() {
        return (
          <FilterSelector
            {...{ attrs: { ...defaultProps } }}
            availableValues={['one', 'two']}
            disabled
          />
        );
      },
    }));

    expect(tree.find('button').element.disabled)
      .toBeTruthy();
  });
});
