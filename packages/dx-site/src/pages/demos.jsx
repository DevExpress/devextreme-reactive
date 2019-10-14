import * as React from 'react';
import DemosList from '../components/landing/sections/demos-list';
import PageLayout from '../components/layouts/section-main-page';
import AlternatedBackground from '../components/landing/alternated-background';
import GridDataShapingImage from './demo-images/Integrated-Data-Shaping.png';
import GridReduxIntegrationImage from './demo-images/Redux-Integration.png';
import GridChartIntegrationImage from './demo-images/Chart-Integration.png';
import SchedulerAppearanceCustomizationImage from './demo-images/scheduler/Appearance-Customization.png';
import SchedulerDataEditingImage from './demo-images/scheduler/Data-Editing.png';
import SchedulerReduxIntegrationImage from './demo-images/scheduler/Redux-Integration.png';
import ChartMultipleAxesImage from './demo-images/chart/Multiple-Axes.png';
import ChartRotatedImage from './demo-images/chart/Rotated-Chart.png';
import ChartSteamgraphImage from './demo-images/chart/Steamgraph.png';

const gridDemos = {
  title: 'React Grid Demos',
  featured: [
    {
      title: 'Integrated Data Shaping',
      path: '/react/grid/demos/featured/integrated-data-shaping/',
      image: GridDataShapingImage
    },
    {
      title: 'Redux integration',
      path: '/react/grid/demos/featured/redux-integration/',
      image: GridReduxIntegrationImage
    },
    {
      title: 'Chart integration',
      path: '/react/grid/demos/featured/chart-integration/',
      image: GridChartIntegrationImage
    },
  ],
  technical: [
    { title: 'Data Formatting', path: '/react/grid/docs/guides/data-formatting/' },
    { title: 'Sorting', path: '/react/grid/docs/guides/sorting/' },
    { title: 'Paging', path: '/react/grid/docs/guides/paging/' },
    { title: 'Filtering', path: '/react/grid/docs/guides/filtering/' },
    { title: 'Searching', path: '/react/grid/docs/guides/searching/' },
    { title: 'Editing', path: '/react/grid/docs/guides/editing/' },
    { title: 'Grouping', path: '/react/grid/docs/guides/grouping/' },
    { title: 'Selection', path: '/react/grid/docs/guides/selection/' },
    { title: 'Summary Row', path: '/react/grid/docs/guides/summary-row/' },
    { title: 'Detail Row', path: '/react/grid/docs/guides/detail-row/' },
    { title: 'Fixed Columns', path: '/react/grid/docs/guides/fixed-columns/' },
    { title: 'Banded Columns', path: '/react/grid/docs/guides/banded-columns/' },
    { title: 'Virtual Scrolling', path: '/react/grid/docs/guides/virtual-scrolling/' },
    { title: 'Tree Data', path: '/react/grid/docs/guides/tree-data/' },
  ],
};

const schedulerDemos = {
  title: 'React Scheduler Demos',
  featured: [
    {
      title: 'Appearance Customization',
      path: '/demos/...',
      image: SchedulerAppearanceCustomizationImage,
    },
    {
      title: 'Data Editing',
      path: '/demos/...',
      image: SchedulerDataEditingImage,
    },
    {
      title: 'Redux Integration',
      path: '/demos/...',
      image: SchedulerReduxIntegrationImage,
    },
  ],
  technical: [
    { title: 'Views', path: '' },
    { title: 'Appointments', path: '' },
    { title: 'View Switching', path: '' },
    { title: 'Date Navigation', path: '' },
    { title: 'Appointment Tooltip', path: '' },
    { title: 'Editing', path: '' },
    { title: 'Localization', path: '' },
  ],
};

const chartDemos = {
  title: 'React Chart Demos',
  featured: [
    {
      title: 'Multiple Axes',
      path: '/demos/...',
      image: ChartMultipleAxesImage,
    },
    {
      title: 'Rotated Chart',
      path: '/demos/...',
      image: ChartRotatedImage,
    },
    {
      title: 'Steamgraph',
      path: '/demos/...',
      image: ChartSteamgraphImage,
    },
  ],
  technical: [
    { title: 'Series', path: '' },
    { title: 'Axes', path: '' },
    { title: 'Legend and Title', path: '' },
    { title: 'Stacked Series', path: '' },
    { title: 'Palette', path: '' },
    { title: 'Animation', path: '' },
    { title: 'Hover and Selection', path: '' },
    { title: 'Tooltip', path: '' },
    { title: 'Zoom and Pan', path: '' },
  ],
};

export default () => (
  <PageLayout section="demos" title="Reactive Demos">
    <AlternatedBackground>
      <DemosList
        data={gridDemos}
      />
    </AlternatedBackground>
    <DemosList
      data={schedulerDemos}
    />
    <AlternatedBackground>
      <DemosList
        data={chartDemos}
      />
    </AlternatedBackground>
  </PageLayout>
);
