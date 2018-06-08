import { shallow } from '@vue/test-utils';
import { Container } from './container';

describe('Container', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <Container>
            <div class="content" />
          </Container>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
