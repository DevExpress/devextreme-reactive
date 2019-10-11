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
      path: '/demos/...',
      image: GridDataShapingImage
    },
    {
      title: 'Redux integration',
      path: '/demos/...',
      image: GridReduxIntegrationImage
    },
    {
      title: 'Chart integration',
      path: '/demos/...',
      image: GridChartIntegrationImage
    },
  ],
  technical: [
    { title: 'Data Formatting', path: '' },
    { title: 'Sorting', path: '' },
    { title: 'Paging', path: '' },
    { title: 'Filtering', path: '' },
    { title: 'Searching', path: '' },
    { title: 'Editing', path: '' },
    { title: 'Grouping', path: '' },
    { title: 'Selection', path: '' },
    { title: 'Summaries', path: '' },
    { title: 'Detail Row', path: '' },
    { title: 'Fixed Columns', path: '' },
    { title: 'Banded Columns', path: '' },
    { title: 'Virtual Scrolling', path: '' },
    { title: 'Tree Data', path: '' },
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
