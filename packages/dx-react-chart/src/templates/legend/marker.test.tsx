import * as React from 'react';
import { create } from 'react-test-renderer';
import { Marker } from './marker';

describe('Marker', () => {

  it('should render span', () => {
    const ref = React.createRef() as React.RefObject<Marker>;
    const tree = create(<Marker color="color" ref={ref}/>);
    expect(tree.root.findByProps({fill: "color"}).type)
      .toEqual('svg');
  });

  it('should pass the rest property to the root element', () => {
    const tree = create(<Marker customProperty />);
    const { customProperty } = tree.root.findByType('svg').props as any;

    expect(customProperty)
      .toBeTruthy();
  });
});
