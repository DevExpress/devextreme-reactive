import * as React from 'react';
import PageLayout from '../components/layouts/docs-page-layout';
import ProductDocPreview from '../components/landing/sections/product-doc-preview';
import ConceptDocPreview from '../components/landing/sections/concept-doc-preview';

import ReactGridIcon from './images/react-grid.inline.svg';
import ReactChartIcon from './images/react-chart.inline.svg';
import ReactSchedulerIcon from './images/react-scheduler.inline.svg';

const commonConcepts = [
  {
    title: 'Localization',
    path: '/react/common/docs/guides/localization/',
    description: 'Translate messages and format numbers and dates in DevExtreme Reactive components.',
  },
  {
    title: 'Custom Themes',
    path: '/react/common/docs/guides/custom-theme/',
    description: 'Integrate DevExtreme Reactive components with a third-party UI framework.',
  },
  {
    title: 'Performance',
    path: '/react/common/docs/guides/performance-optimization/',
    description: 'Apply tips and tricks for higher performance.',
  },
];

const advancedConcepts = [
  {
    title: 'Fundamentals',
    path: '/react/core/docs/guides/fundamentals/',
    description: 'Learn the principles of our plugin-based architecture.',
  },
  // TODO: write guides
  // {
  //   title: 'State Management',
  //   path: '',
  //   description: 'Configure DevExtreme Reactive components for controlled
  // and uncontrolled modes.',
  // },
  // {
  //   title: 'Using Redux',
  //   path: '',
  //   description: 'Connect DevExtreme Reactive components to a Redux store',
  // },
];

export default () => (
  <PageLayout sectionName="docs">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Documentation</h1>

          <div className="alert-note">
            <div>
              <div className="note-start">NOTE</div>
              <p>
                <div className="part-title">DevExtreme Reactive Components - Maintenance Support Mode</div>
                DevExtreme Reactive component libraries are in&nbsp;
                <a
                href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
                target="_blank"
                rel="noopener noreferrer"
                >
                maintenance support mode
                </a>
                . No new features/capabilities will be added to DevExtreme Reactive component
                libraries in the future (end-of-life: December 2025).
              </p>
              <p>
                <div className="part-title">Developing a React App? Check out our updated React UI Suite instead.</div>
                If you are considering React for an upcoming software project or
                have used DevExtreme Reactive components in the past, please visit&nbsp;
                <a
                  href="https://js.devexpress.com/react/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  js.devexpress.com/react
                </a>
                &nbsp;and download a free trial version of DevExtreme React UI - over 70+ components
                designed to help you build your best, without limits or compromise.
              </p>
            </div>
          </div>
        </div>
      </div>

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
        {commonConcepts.map(concept => (
          <ConceptDocPreview {...concept} key={concept.title} />
        ))}
      </div>

      <div className="row my-2">
        <div className="col-12">
          <h2>Advanced Concepts</h2>
        </div>
      </div>
      <div className="row">
        {advancedConcepts.map(concept => (
          <ConceptDocPreview {...concept} key={concept.title} />
        ))}
      </div>

    </div>
  </PageLayout>
);
