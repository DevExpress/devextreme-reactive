import { shallow } from '@vue/test-utils';
import { SearchPanelInput } from './search-panel-input';

const defaultProps = () => ({
  getMessage: jest.fn().mockReturnValue('placeholder'),
  onValueChange: jest.fn(),
});

describe('Input search box', () => {
  it('should render input component', () => {
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
          />
        );
      },
    });
    expect(tree.findAll('input')).toHaveLength(1);
  });

  it('should render input component with Value', () => {
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
            value="abc"
          />
        );
      },
    });
    expect(tree.find('input').element.value).toBe('abc');
  });

  it('should trigger onValueChange when change event fire', () => {
    const onValueChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
            value="abc"
            onValueChange={onValueChange}
          />
        );
      },
    });
    const input = tree.find('input');

    input.element.value = 'abc';
    input.trigger('input');
    expect(onValueChange).toBeCalledWith('abc');
  });

  it('should set placeholder', () => {
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
          />
        );
      },
    });

    expect(tree.find('input').element.placeholder).toBe('placeholder');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
            class="custom-class"
          />
        );
      },
    });

    expect(tree.is('.form-control.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <SearchPanelInput
            {...{ attrs: { ...defaultProps() } }}
            data="abc"
          />
        );
      },
    });

    expect(tree.attributes().data)
      .toBe('abc');
  });
});
