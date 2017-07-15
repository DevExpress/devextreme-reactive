import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import { demos } from '../demo-registry';
import { SectionViewer } from './section-viewer';

export const SectionsViewer = ({ match: { url } }) => {
  const sections = Object.keys(demos);

  return (
    <Switch>
      <Redirect exact from={`${url}`} to={`${url}/${sections[0]}`} />
      <Route
        path={`${url}/:section`}
        render={({ match: { params: { section: currentSection } } }) => (
          <div className="container">
            <div className="row">
              <div className="col-md-3 main-menu">
                <h3>Demo Sections</h3>
                <ul className="list-unstyled">
                  {sections.map(section => (
                    <li key={section}>
                      {section === currentSection
                        ? <span>{section}</span>
                        : <Link to={`${url}/${section}`}>{section}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-9 demo-content">
                <h2>{currentSection}</h2>
                <SectionViewer section={currentSection} />
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  );
};

SectionsViewer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
