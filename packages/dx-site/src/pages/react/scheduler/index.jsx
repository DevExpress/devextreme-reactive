import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layouts/layout';
import Header from '../../../components/header';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingChessBoardLayoutList from '../../../components/landing/features-list';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingProductLinks from '../../../components/landing/product-links';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import headerImage from './images/Scheduler-screenshot.png';
import familiarUXImage from './images/Familiar-Intuitive-UX.png';
import recurringAppointmentsImage from './images/Recurring-Appointments.png';
import dayViewImage from './images/Day-View.png';
import weekViewImage from './images/Week-View.png';
import monthViewImage from './images/Month-View.png';
import resourcesSupportImage from './images/Resources-Support.png';
import resourcesGroupingImage from './images/Resource-Grouping.png';

import LandingThingsThatMatter from '../../../components/landing/things-that-matter';
import ButtonLinksContainer from '../../../components/landing/button-links-container';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';
import NotificationBox from '../../../components/docs/notification-box';

const pageData = [
  {
    sectionTitle: 'Inspired by Google Calendar',
    reversed: true,
    title: 'Familiar & Intuitive UX',
    description: 'The look and feel of Google’s Material Design and a Google-inspired UX make our React Scheduler extremely easy to use. End-users can manage events using straightforward drag & drop operations (just as they would with Google Calendar).',
    imageLink: familiarUXImage,
    guideLink: '/react/scheduler/demos/featured/appearance-customization/',
  },
  {
    alternative: true,
    title: 'Recurring Appointments',
    description: 'Use built-in recurring appointment dialogs, configuration forms, and our flexible API to manage recurring event chains. Our React Scheduler is built using the iCalendar specification. As such, you can easily extend and customize it as needed.',
    imageLink: recurringAppointmentsImage,
    guideLink: '/react/scheduler/docs/guides/appointments/#recurring-appointments',
  },
  {
    alternative: true,
    title: 'Resources Support',
    description: 'Allow end-users to browse multiple schedules (for any entity such as an employee or office location, etc) simultaneously or individually using a resource filter. The same event can be assigned to multiple resources.',
    imageLink: resourcesSupportImage,
    guideLink: '/react/scheduler/docs/guides/resources/',
  },
  {
    alternative: true,
    title: 'Resource Grouping',
    description: 'Allow end-users to browse multiple schedules simultaneously. Once resources have been generated, the scheduler will display multiple parallel timelines. Resource headers can be customized, and the same event can be assigned to multiple resources.',
    imageLink: resourcesGroupingImage,
    guideLink: '/react/scheduler/docs/guides/grouping/',
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
    description: 'The Month View displays a snapshot of appointments across an entire month.',
    imageLink: monthViewImage,
    guideLink: '/react/scheduler/docs/guides/views/#month-view',
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Scheduler" />
    <Header
      page="productPage"
      links={<LandingProductLinks />}
      addon={(
        <LandingHeaderAddon
          main="React Scheduler"
          additional={(
            <>
              for Material-UI
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
            </>
          )}
        />
      )}
    />
    <LandingProductFloatImage imageLink={headerImage} />

    <AlternatedBackground>
      <NotificationBox style={{ paddingTop: '40px' }} />
      <LandingChessBoardLayoutList data={pageData} columns={2} />
    </AlternatedBackground>

    <LandingLayout style={{ paddingTop: '2em', paddingBottom: '2em' }}>
      <LandingTitle text="Native Support for the Material-UI Library" />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material-UI React Scheduler"
        description="DevExtreme React Scheduler leverages the look and feel of the highly popular Material-UI library for the best possible developer experience."
      />
    </LandingLayout>

    <AlternatedBackground>
      <LandingLayout>
        <LandingThingsThatMatter />
      </LandingLayout>
    </AlternatedBackground>

    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <LandingMaintainence />
    </div>
    <LandingReadyToLearnMore
      links={(
        <>
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
        </>
      )}
    />
  </Layout>
);

export default IndexPage;
