import { shallow } from '@vue/test-utils';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
  const defaultProps = {
    buttonRef: () => {},
  };
  it('should render active button if the "active" prop is true', () => {
    const wrapper = shallow({
      render() {
        return (
          <ToggleButton
            {...{ attrs: { ...defaultProps } }}
            onToggle={() => {}}
            active
          />
        );
      },
    });
    expect(wrapper.classes())
      .toContain('active');
  });

  it('should not render active button if the "active" prop is false', () => {
    const wrapper = shallow({
      render() {
        return (
          <ToggleButton
            {...{ attrs: { ...defaultProps } }}
            onToggle={() => {}}
            active={false}
          />
        );
      },
    });

    expect(wrapper.classes())
      .not.toContain('active');
  });

  it('should pass element to the buttonRef function', () => {
    const buttonRef = jest.fn();
    const wrapper = shallow({
      render() {
        return (
          <ToggleButton
            buttonRef={buttonRef}
            onToggle={() => {}}
          />
        );
      },
    });

    expect(buttonRef)
      .toBeCalledWith(wrapper.element);
  });

  it('should pass the toggle event to the onClick event handler', () => {
    const toggle = jest.fn();
    const wrapper = shallow({
      render() {
        return (
          <ToggleButton
            {...{
              attrs: { ...defaultProps },
              on: {
                toggle,
              },
            }}
          />
        );
      },
    });
    wrapper.find('button').trigger('click');

    expect(toggle)
      .toBeCalled();
  });
});
