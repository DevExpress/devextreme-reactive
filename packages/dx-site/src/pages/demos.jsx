import * as React from 'react';
import DemosList from '../components/landing/sections/demos-list';
import PageLayout from '../components/layouts/demo-page-layout';

import ReactGridIcon from './images/react-grid.inline.svg';
import ReactChartIcon from './images/react-chart.inline.svg';
import ReactSchedulerIcon from './images/react-scheduler.inline.svg';
import GridDataShapingImage from './demo-images/grid/Integrated-Data-Shaping.png';
import GridReduxIntegrationImage from './demo-images/grid/Redux-Integration.png';
import GridChartIntegrationImage from './demo-images/grid/Chart-Integration.png';
import SchedulerAppearanceCustomizationImage from './demo-images/scheduler/Appearance-Customization.png';
import SchedulerDataEditingImage from './demo-images/scheduler/Data-Editing.png';
import SchedulerReduxIntegrationImage from './demo-images/scheduler/Redux-Integration.png';
import ChartMultipleAxesImage from './demo-images/chart/Multiple-Axes.png';
import ChartRotatedImage from './demo-images/chart/Rotated-Chart.png';
import ChartSteamgraphImage from './demo-images/chart/Steamgraph.png';
import NotificationBox from '../components/docs/notification-box';
// eslint-disable-next-line no-unused-vars
import styles from './demos.module.scss';

const gridDemos = {
  title: 'React Grid Demos',
  icon: ReactGridIcon,
  featured: [
    {
      title: 'Integrated Data Shaping',
      path: '/react/grid/demos/featured/integrated-data-shaping/',
      image: GridDataShapingImage,
    },
    {
      title: 'Redux integration',
      path: '/react/grid/demos/featured/redux-integration/',
      image: GridReduxIntegrationImage,
    },
    {
      title: 'Chart integration',
      path: '/react/grid/demos/featured/chart-integration/',
      image: GridChartIntegrationImage,
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
  icon: ReactSchedulerIcon,
  featured: [
    {
      title: 'Appearance Customization',
      path: '/react/scheduler/demos/featured/appearance-customization/',
      image: SchedulerAppearanceCustomizationImage,
    },
    {
      title: 'Data Editing',
      path: '/react/scheduler/demos/featured/data-editing/',
      image: SchedulerDataEditingImage,
    },
    {
      title: 'Redux Integration',
      path: '/react/scheduler/demos/featured/redux-integration/',
      image: SchedulerReduxIntegrationImage,
    },
  ],
  technical: [
    { title: 'Views', path: '/react/scheduler/docs/guides/views/' },
    { title: 'Appointments', path: '/react/scheduler/docs/guides/appointments/' },
    { title: 'View Switching', path: '/react/scheduler/docs/guides/view-switching/' },
    { title: 'Date Navigation', path: '/react/scheduler/docs/guides/date-navigation/' },
    { title: 'Appointment Tooltip', path: '/react/scheduler/docs/guides/appointment-tooltip/' },
    { title: 'Editing', path: '/react/scheduler/docs/guides/editing/' },
    { title: 'Localization', path: '/react/scheduler/docs/guides/localization/' },
  ],
};

const chartDemos = {
  title: 'React Chart Demos',
  icon: ReactChartIcon,
  featured: [
    {
      title: 'Multiple Axes',
      path: '/react/chart/demos/combination/multiple-axes/',
      image: ChartMultipleAxesImage,
    },
    {
      title: 'Rotated Chart',
      path: '/react/chart/demos/bar/rotated-bar/',
      image: ChartRotatedImage,
    },
    {
      title: 'Steamgraph',
      path: '/react/chart/demos/area/streamgraph/',
      image: ChartSteamgraphImage,
    },
  ],
  technical: [
    { title: 'Series', path: '/react/chart/docs/guides/series/' },
    { title: 'Axes', path: '/react/chart/docs/guides/axes/' },
    { title: 'Legend and Title', path: '/react/chart/docs/guides/legend_title/' },
    { title: 'Stacked Series', path: '/react/chart/docs/guides/stacked-series/' },
    { title: 'Palette', path: '/react/chart/docs/guides/palette/' },
    { title: 'Animation', path: '/react/chart/docs/guides/animation/' },
    { title: 'Hover and Selection', path: '/react/chart/docs/guides/hover-and-selection/' },
    { title: 'Tooltip', path: '/react/chart/docs/guides/tooltip/' },
    { title: 'Zoom and Pan', path: '/react/chart/docs/guides/zoom-and-pan/' },
  ],
};

export default () => (
  <PageLayout sectionName="demos">
    <NotificationBox style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }} />
    <DemosList data={gridDemos} />
    <hr />
    <DemosList data={schedulerDemos} />
    <hr />
    <DemosList data={chartDemos} />
  </PageLayout>
);
