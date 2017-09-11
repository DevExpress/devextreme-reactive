import React from 'react';
import { mount } from 'enzyme';

import { TemplateRenderer } from './template-renderer';

describe('TemplateRenderer', () => {
  it('should work', () => {
    const tree = mount(
      <TemplateRenderer
        template={({ test, children }) => <div className={test}>{children}</div>}
        params={{ test: 'test' }}
      >
        <div className="content" />
      </TemplateRenderer>,
    );

    expect(tree.find('.test > .content').exists())
      .toBe(true);
  });
});
