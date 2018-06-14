import { shallow } from '@vue/test-utils';
import { Editor } from './editor';

const defaultProps = {
  getMessage: key => key,
};

describe('Editor', () => {
  it('should render a readonly input if disabled', () => {
    const tree = shallow(({
      render() {
        return (
          <Editor
            {...{ attrs: { ...defaultProps } }}
            disabled
          />
        );
      },
    }));

    expect(tree.find('input').element.readOnly)
      .toBeTruthy();
  });

  it('should trigger changeValue when change event fire', () => {
    const onValueChange = jest.fn();
    const tree = shallow(({
      render() {
        return (
          <Editor
            {...{ attrs: { ...defaultProps } }}
            onChangeValue={onValueChange}
          />
        );
      },
    }));

    const input = tree.find('input');

    input.element.value = 'abc';
    input.trigger('input');
    expect(onValueChange).toBeCalledWith('abc');
  });
});
