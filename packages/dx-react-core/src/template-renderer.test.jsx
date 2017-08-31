import React from 'react';
import { mount } from 'enzyme';

import { TemplateRenderer } from './template-renderer';

describe('TemplateRenderer', () => {
  it('should work', () => {
    const tree = mount(
      <TemplateRenderer
        template={({ test, children }) => <div className={test}>{children}</div>}
        test={'test'}
      >
        <div className="content" />
      </TemplateRenderer>,
    );

    expect(tree.find('.test > .content').exists())
      .toBe(true);
  });

  it('should pass templateRef as ref', () => {
    const templateRef = jest.fn();
    mount(
      <TemplateRenderer
        template={({ ref }) => <div ref={ref} />}
        templateRef={templateRef}
        test={'test'}
      />,
    );

    expect(templateRef)
      .toBeCalled();
  });
});
