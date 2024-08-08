import * as React from 'react';
import bannerSVG from './images/banner-react.svg';
import styles from './banner.module.scss';

const Banner = () => {
  const [show, setShow] = React.useState(true);
  const onDismissClick = () => setShow(false);

  return show ? (
    <div className={styles.banner}>
      <div className="container">
        <div className="row align-items-center px-2">
          <div className="col-10 col-sm-11">
            <div className="container">
              <div className="row">
                <div className="d-none d-lg-block col pr-0">
                  <p className="m-0 banner-text">DevExtreme Reactive component libraries are in maintenance support mode.</p>
                </div>
                <div className="d-none d-md-block col col-lg-auto">
                  <img src={bannerSVG} alt="react" />
                </div>
                <div className="col-12 col-sm-10 col-lg-6">
                  <p className="m-0 banner-text">
                    <span className="d-block d-lg-none">DevExtreme Reactive component libraries are in maintenance support mode.</span>
                    For additional information in this regard, please review the following
                    readme on GitHub:&nbsp;
                    <a
                      href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DevExtreme Reactive Components - Maintenance Mode
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-1 d-flex justify-content-end">
            <button type="button" className={styles.button} aria-label="Close" onClick={onDismissClick}>
              <span className="d-none d-lg-block">Dismiss</span>
              <i>&times;</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Banner;
