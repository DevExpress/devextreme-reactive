import * as React from 'react';
import { createMount, getClasses, setupConsole } from '@devexpress/dx-testing';

import { InlineSummary } from './inline-summary';

describe('InlineSummary component', () => {
  let classes;
  let mount;
  const defaultProps = {
    inlineSummaries: [],
    getMessage: jest.fn(),
    inlineSummaryItemComponent: () => null,
  };
  const summaries = [
    { type: 'min', value: 3 },
    { type: 'count', value: 10 },
  ];

  let resetConsole;
  beforeAll(() => {
    classes = getClasses(<InlineSummary {...defaultProps} />);
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass classes to the root element', () => {
    const tree = mount((
      <InlineSummary
        {...defaultProps}
        className="custom"
      />
    ));

    expect(tree.find('span').is(`.${classes.inlineSummary}.custom`))
      .toBeTruthy();
  });

  it('should pass rest props to the span element', () => {
    const tree = mount((
      <InlineSummary
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({
        a: 1,
      });
  });

  it('should render summaries by using InlineSummaryItem component', () => {
    const tree = mount((
      <InlineSummary
        {...defaultProps}
        inlineSummaries={summaries}
      />
    ));

    expect(tree.find(defaultProps.inlineSummaryItemComponent)
      .map(item => item.props()))
      .toEqual([
        {
          summary: summaries[0],
          getMessage: defaultProps.getMessage,
        },
        {
          summary: summaries[1],
          getMessage: defaultProps.getMessage,
        },
      ]);
  });

  it('should format summary text', () => {
    const SummaryItem = ({ summary }) => summary.value;
    const tree = mount((
      <InlineSummary
        {...defaultProps}
        inlineSummaries={summaries}
        inlineSummaryItemComponent={SummaryItem}
      />
    ));

    expect(tree.find('span').text())
      .toBe('(3, 10)');
  });
});
