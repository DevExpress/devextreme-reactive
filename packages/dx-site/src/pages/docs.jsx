import * as React from 'react';
import PageLayout from '../components/layouts/section-main-page';
import Title from '../components/landing/sections/title';
import DocPreview from '../components/landing/sections/doc-preview';

import reactGridIcon from './images/react-grid.svg';
import reactChartIcon from './images/react-chart.svg';
import reactSchedulerIcon from './images/react-scheduler.svg';

const concepts = [
  { title: 'Core Design', path: '' },
  { title: 'State Management', path: '' },
  { title: 'Using Redux', path: '' },
  { title: 'Localization', path: '' },
  { title: 'Theming', path: '' },
  { title: 'Performance', path: '' },
]

export default () => (
  <PageLayout section="docs" title="Documentation">
    <div className="container">
      <Title text="Documentation" />

      <div className="row my-3">  
        <DocPreview
          title="Grid"
          imageLink={reactGridIcon}
        />
        <DocPreview
          title="Scheduler"
          imageLink={reactSchedulerIcon}
        />
        <DocPreview
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
        {concepts.map(({ title, path }) => (
          <DocPreview title={title} />
        ))}
      </div>

    </div>
  </PageLayout>
);
