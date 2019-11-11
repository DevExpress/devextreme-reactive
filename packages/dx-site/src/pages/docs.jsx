import * as React from 'react';
import PageLayout from '../components/layouts/page-layout';
import Title from '../components/landing/sections/title';
import ProductDocPreview from '../components/landing/sections/product-doc-preview';
import ConceptDocPreview from '../components/landing/sections/concept-doc-preview';

import ReactGridIcon from './images/react-grid.inline.svg';
import ReactChartIcon from './images/react-chart.inline.svg';
import ReactSchedulerIcon from './images/react-scheduler.inline.svg';

const concepts = [
  {
    title: 'Fundamentals',
    path: '/react/core/docs/guides/fundamentals/',
    description: 'Learn the basics of our plugin-based architecture.',
  },
  {
    title: 'State Management',
    path: '',
    description: 'Learn how to configure our components in controlled and uncontrolled modes.',
  },
  {
    title: 'Using Redux',
    path: '',
    description: 'Learn how to connect our components to a Redux store.',
  },
  {
    title: 'Localization',
    path: '',
    description: 'Learn how to localize DevExtreme Reactive components.',
  },
  {
    title: 'Theming',
    path: '/react/common/docs/guides/custom-theme/',
    description: 'Integrate DevExtreme Reactive components with a third-party UI framework.',
  },
  {
    title: 'Performance',
    path: '/react/common/docs/guides/performance-optimization/',
    description: 'This article describes how to provide high performance for your application.',
  },
]

export default () => (
  <PageLayout sectionName="docs">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Documentation</h1>
        </div>
      </div>
      {/* <Title text="Documentation" /> */}

      <div className="row my-3">
        <ProductDocPreview
          path="/react/grid/docs/"
          title="Grid"
          imageComponent={ReactGridIcon}
        />
        <ProductDocPreview
          path="/react/scheduler/docs/"
          title="Scheduler"
          imageComponent={ReactSchedulerIcon}
        />
        <ProductDocPreview
          path="/react/chart/docs/"
          title="Chart"
          imageComponent={ReactChartIcon}
        />
      </div>

      <div className="row my-2">
        <div className="col-12">
          <h2>Common Concepts</h2>
        </div>
      </div>
      <div className="row">
        {concepts.map(concept => (
          <ConceptDocPreview {...concept} key={concept.title} />
        ))}
      </div>

    </div>
  </PageLayout>
);
