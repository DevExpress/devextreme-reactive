import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingChessBoardLayoutList from '../../../components/landing/features-list';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingProductLinks from '../../../components/landing/product-links';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import imageBoxLink from '../../images/image-box.png';
import headerImage from './images/Scheduler-screenshot.png';
import lightweightUIImage from './images/Lightweight-Concise-UI.png';
import familiarUXImage from './images/Familiar-Intuitive-UX.png';
import recurringAppointmentsImage from './images/Recurring-Appointments.png';
import dayViewImage from './images/Day-View.png';
import weekViewImage from './images/Week-View.png';
import monthViewImage from './images/Month-View.png';
import resourcesSupportImage from './images/Resources-Support.png';
import timelineViewImage from './images/Timeline-Views.png';

import LandingThingsThatMatter from '../../../components/landing/things-that-matter';
import ButtonLinksContainer from '../../../components/landing/button-links-container';
import LandingIconFeature from '../../../components/landing/icon-feature';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';

const pageData = [
  {
    alternative: true,
    sectionTitle: 'Inspired by Google Calendar',
    title: 'Lightweight & Concise UI',
    description: 'Our React Scheduler built using the UI/UX best practises proved by millions of Google Calendar users. Create your own scheduling application extending the default UI and behavior according to your specific business requirements.',
    imageLink: lightweightUIImage,
    guideLink: '/react/scheduler/demos/featured/data-editing/',
  },
  {
    reversed: true,
    title: 'Familiar & Intuitive UX',
    description: 'Allow your end-users to reuse their existing skills while working with the React Scheduler. They can use intuitive Drag-and-Drop operations to create appointments and change their start/end time and duration by move and resize.',
    imageLink: familiarUXImage,
    guideLink: '/react/scheduler/demos/featured/appearance-customization/',
  },
  {
    alternative: true,
    title: 'Recurring Appointments',
    description: 'Use built-in plugins for handling recurring event chains. You can easily customize all recurrence related functionality and address even the most complex requirements with minimal effort. The iCalendar recurrency rule and exception formats are supported.',
    imageLink: recurringAppointmentsImage,
    guideLink: '/react/scheduler/docs/guides/appointments/#recurring-appointments',
  },
  {
    reversed: true,
    sectionTitle: '3 Customizable Built-in View Types',
    title: 'Day View',
    description: 'Display a detailed view of events/appointments for a specific day using the DayView plugin. Integrated Date Navigation buttons make it easy to navigate from one day to the next.',
    imageLink: dayViewImage,
    guideLink: '/react/scheduler/docs/guides/views/#day-view',
  },
  {
    alternative: true,
    title: 'Week & Work Week Views',
    description: 'The Week Views display event details across a specific week. End-users can move from one week to the next using built-in navigation buttons.',
    imageLink: weekViewImage,
    guideLink: '/react/scheduler/docs/guides/views/#week-view',
  },
  {
    reversed: true,
    title: 'Month View',
    description: 'The Month View displays a snapshot of appointments across an entire month. As you would expect, because of the number of days the Scheduler control displays within an application, the view itself is the least detailed of all available.',
    imageLink: monthViewImage,
    guideLink: '/react/scheduler/docs/guides/views/#month-view',
  },
];
const comingSoonItems = [
  {
    alternative: true,
    sectionTitle: 'More Coming Soon',
    title: 'Resources Support',
    description: 'Allow end-users to browse multiple schedules simultaneously. Once resources have been created, the scheduler will display several parallel timelines. Resource headers can be customized and the same event can be assigned to multiple resources.',
    imageLink: resourcesSupportImage,
  },
  {
    reversed: true,
    title: 'Timeline Views',
    description: 'Arrange events and appointments across horizontal timelines. When browsing multiple resources, timelines are displayed one under another. On the top of the view, you can display multiple time rulers with different scales.',
    imageLink: timelineViewImage,
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Scheduler" />
    <Header
      page="productPage"
      logo={<ProductLogo link="react/scheduler" />}
      links={(
        <LandingProductLinks
          productInfo={[
            { title: 'Demos', location: '/react/scheduler/demos/' },
            { title: 'Docs', location: '/react/scheduler/docs/guides/getting-started/' },
          ]}
        />
      )}
      addon={(
        <LandingHeaderAddon
          main="React Scheduler"
          additional={(
            <React.Fragment>
              for Bootstrap and Material-UI
              <ButtonLinksContainer>
                <LandingLink
                  to="/react/scheduler/docs/guides/getting-started/"
                  variant="button"
                  title="Getting Started"
                  fixedWidth
                >
                  Getting Started
                </LandingLink>
                {' '}
                <LandingLink
                  to="/react/scheduler/demos/"
                  type="react"
                  variant="button"
                  title="Demos"
                  fixedWidth
                >
                  Demos
                </LandingLink>
              </ButtonLinksContainer>
            </React.Fragment>
          )}
        />
      )}
    />
    <LandingProductFloatImage imageLink={headerImage} />
    <div className="row my-3" />
    <LandingChessBoardLayoutList data={pageData} columns={3} />
    <LandingChessBoardLayoutList data={comingSoonItems} />

    <AlternatedBackground>
      <LandingLayout>
        <LandingTitle text="Native Support for the UI Library of Your Choice" />
        <LandingImageFeature
          imageLink={materialThemeLink}
          title="Material Design Rendering"
          description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
        />
      </LandingLayout>
    </AlternatedBackground>

    <LandingLayout>
      <LandingThingsThatMatter />
    </LandingLayout>

    <AlternatedBackground style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <LandingMaintainence />
    </AlternatedBackground>
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
          <LandingLink
            to="/react/scheduler/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            fixedWidth
            condensed
          >
            Getting Started
          </LandingLink>
          <LandingLink
            to="/react/scheduler/demos/"
            type="react"
            variant="button"
            title="Demos"
            fixedWidth
            condensed
          >
            Demos
          </LandingLink>
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
