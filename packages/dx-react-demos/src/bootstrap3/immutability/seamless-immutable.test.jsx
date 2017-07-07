import React from 'react';
import { mount } from 'enzyme';

import { SeamlessImmutableDemo } from './seamless-immutable';

describe('BS3: seamless-immutable demo', () => {
  it('should work', () => {
    mount(
      <SeamlessImmutableDemo />,
    );
  });
});

