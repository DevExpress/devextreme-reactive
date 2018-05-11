import * as React from 'react';
import { shallow } from 'enzyme';
import { Marker } from './marker';

describe('Marker', () => {
  it('should render span', () => {
    const tree = shallow(<Marker />);

    expect(tree.type())
      .toEqual('span');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Marker className="custom-class" />
    ));

    expect(tree.is('.custom-class.oi.oi-graph.mx-1'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Marker customProperty />);
    const { customProperty } = tree.find('span').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
