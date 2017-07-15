import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import { sections } from './demo-registry';
import { SectionViewer } from './section-viewer';

export const SectionsViewer = ({ match: { url } }) => (
  <Switch>
    <Redirect exact from={`${url}`} to={`${url}/${sections[0].name}`} />
    <Route
      path={`${url}/:section`}
      render={({ match: { params: { section } } }) => (
        <div className="container">
          <div className="row">
            <div className="col-md-3 main-menu">
              <h3>Demo Sections</h3>
              <ul className="list-unstyled">
                {sections.map(({ name, title }) => (
                  <li key={name}>
                    {name === section
                      ? <span>{title}</span>
                      : (
                        <Link to={`${url}/${name}`}>
                          {title}
                        </Link>
                      )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-9 demo-content">
              <h2>{sections.find(({ name }) => name === section).title}</h2>
              <SectionViewer section={section} />
            </div>
          </div>
        </div>
      )}
    />
  </Switch>
);

SectionsViewer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
