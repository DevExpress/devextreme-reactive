import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import ReduxIntegrationDemo from './demo';

describe('BS3 featured: redux integration demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <ReduxIntegrationDemo />,
    );
  });
});
