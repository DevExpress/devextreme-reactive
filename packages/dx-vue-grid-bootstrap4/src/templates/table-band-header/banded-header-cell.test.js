import { shallow } from '@vue/test-utils';
import { BandedHeaderCell } from './banded-header-cell';

describe('BandedHeaderCell', () => {
  it('should render the specified component', () => {
    const wrapper = shallow({
      render() {
        return (
          <BandedHeaderCell
            component={{
              render() {
                return <div class="component" />;
              },
            }}
          />
        );
      },
    });

    expect(wrapper.find('.component').exists())
      .toBeTruthy();
  });
});
