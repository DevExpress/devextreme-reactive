import React from 'react';
import { mount } from 'enzyme';

import { TemplateComponent } from './template-component';

describe('TemplateComponent', () => {
  it('should work', () => {
    const tree = mount(
      <TemplateComponent
        template={({ test, children }) => <div className={test}>{children}</div>}
        test={'test'}
      >
        <div className="content" />
      </TemplateComponent>,
    );

    expect(tree.find('.test > .content').exists())
      .toBe(true);
  });
});
