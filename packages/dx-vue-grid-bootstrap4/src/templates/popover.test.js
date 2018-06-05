import { shallow } from '@vue/test-utils';
import { Popover } from './popover';

const defaultProps = {
  target: {
    getBoundingClientRect: () => ({
      bottom: 10,
      left: 100,
      width: 20,
    }),
  },
};

describe('Popover', () => {
  it('can render visible element', () => {
    const wrapper = shallow({
      render() {
        return (
          <Popover
            {...{ attrs: { ...defaultProps } }}
            visible
          />
        );
      },
    });

    expect(wrapper.classes())
      .not.toContain('d-none');
  });

  it('can render hidden element', () => {
    const wrapper = shallow({
      render() {
        return (
          <Popover
            {...{ attrs: { ...defaultProps } }}
            visible={false}
          />
        );
      },
    });

    expect(wrapper.classes())
      .toContain('d-none');
  });

  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <Popover
            {...{ attrs: { ...defaultProps } }}
          >
            <div class="content" />
          </Popover>
        );
      },
    });

    expect(wrapper.find('.popover-inner .content').exists())
      .toBeTruthy();
  });

  it('should emit toggle event on document click', () => {
    const toggle = jest.fn();
    shallow({
      render() {
        return (
          <Popover
            {...{
              attrs: { ...defaultProps },
              on: {
                toggle,
              },
            }}
            visible
          />
        );
      },
    });

    document.body.click();
    expect(toggle).toBeCalled();
  });

  it('should calculate position', () => {
    const wrapper = shallow({
      render() {
        return (
          <Popover
            {...{ attrs: { ...defaultProps } }}
            container={{
              offsetWidth: 300,
            }}
            width={50}
            visible
          />
        );
      },
    });

    expect(wrapper.element.style.transform)
      .toBe('translate(85px, 13px)');
  });

  it('should calculate position shift depend on container size', () => {
    const wrapper = shallow({
      render() {
        return (
          <Popover
            target={{
              getBoundingClientRect: () => ({
                bottom: 10,
                left: 290,
                width: 20,
              }),
            }}
            container={{
              offsetWidth: 300,
            }}
            width={50}
            visible
          />
        );
      },
    });

    expect(wrapper.element.style.transform)
      .toBe('translate(247px, 13px)');
  });
});
