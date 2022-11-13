import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Link, Route, Switch, Redirect,
} from 'react-router-dom';

import { SectionViewer } from './section-viewer';
import { EmbeddedDemoContext } from '../context';

export const SectionsViewer = ({
  match: { url },
}) => (
  <EmbeddedDemoContext.Consumer>
    {({ demoSources }) => {
      const sections = Object.keys(demoSources);
      return (
        <Switch>
          <Redirect exact from={`${url}`} to={`${url}/${sections[0]}`} />
          <Route
            path={`${url}/:sectionName`}
            render={({ match: { params: { sectionName } } }) => (
              <div className="container">
                <div className="row">
                  <div className="col-md-3 main-menu">
                    <h3>
                      Demo Sections
                    </h3>
                    <ul className="list-unstyled">
                      {sections.map(section => (
                        <li key={section}>
                          {section === sectionName
                            ? (
                              <span>
                                {section}
                              </span>
                            )
                            : (
                              <Link to={`${url}/${section}`}>
                                {section}
                              </Link>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-9 demo-content">
                    <h2>
                      {sectionName}
                    </h2>
                    <SectionViewer sectionName={sectionName} />
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      );
    }}
  </EmbeddedDemoContext.Consumer>
);

SectionsViewer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
