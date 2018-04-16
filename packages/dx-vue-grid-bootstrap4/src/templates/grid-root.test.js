import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { GridRoot } from './grid-root';

describe('GridRoot', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <GridRoot>
            <div class="content" />
          </GridRoot>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
