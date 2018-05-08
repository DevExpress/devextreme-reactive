import * as React from 'react';
import { shallow } from 'enzyme';
import Timeline from '@material-ui/icons/Timeline';
import { Marker } from './marker';

describe('Marker', () => {
  it('should render Timeline icon', () => {
    const tree = shallow((
      <Marker />
    ));

    expect(tree.equals(<Timeline />))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Marker customProperty />);
    const { customProperty } = tree.find(Timeline).props();
    expect(customProperty)
      .toBeTruthy();
  });
});
