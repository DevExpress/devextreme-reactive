import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import SeamlessImmutableDemo from './seamless-immutable';

describe('BS3: seamless-immutable demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <SeamlessImmutableDemo />,
    );
  });
});

