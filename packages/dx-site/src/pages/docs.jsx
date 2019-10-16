import * as React from 'react';
import PageLayout from '../components/layouts/page-layout';
import Title from '../components/landing/sections/title';
import DocPreview from '../components/landing/sections/doc-preview';

import reactGridIcon from './images/react-grid.svg';
import reactChartIcon from './images/react-chart.svg';
import reactSchedulerIcon from './images/react-scheduler.svg';

const concepts = [
  { title: 'Fundamentals', path: '/react/core/docs/guides/fundamentals/' },
  { title: 'State Management', path: '' },
  { title: 'Using Redux', path: '' },
  { title: 'Localization', path: '' },
  { title: 'Theming', path: '/react/common/docs/guides/custom-theme/' },
  { title: 'Performance', path: '/react/common/docs/guides/performance-optimization/' },
]

export default () => (
  <PageLayout sectionName="docs">
    <div className="container">
      <Title text="Documentation" />

      <div className="row my-3">  
        <DocPreview
          path="/react/grid/docs/"
          title="Grid"
          imageLink={reactGridIcon}
        />
        <DocPreview
          path="/react/scheduler/docs/"
          title="Scheduler"
          imageLink={reactSchedulerIcon}
        />
        <DocPreview
          path="/react/chart/docs/"
          title="Chart"
          imageLink={reactChartIcon}
        />
      </div>

      <div className="row my-2">
        <div className="col-12">
          <h4>Common Concepts</h4>
        </div>
      </div>
      <div className="row">
        {concepts.map(concept => (
          <DocPreview {...concept} />
        ))}
      </div>

    </div>
  </PageLayout>
);
