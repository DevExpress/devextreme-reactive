import * as React from 'react';
import bannerSVG from './images/banner-react.svg';
import styles from './banner.module.scss';

const SHOW_BANNER_KEY = 'dx-show-banner';

let storage = { getItem: () => undefined, setItem: () => undefined };
try {
  // eslint-disable-next-line no-undef
  storage = window.localStorage;
} catch (e) {} // eslint-disable-line no-empty

const Banner = () => {
  const [show, setShow] = React.useState(() => {
    const showBanner = storage.getItem(SHOW_BANNER_KEY);
    return showBanner !== '0';
  });

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(SHOW_BANNER_KEY, show ? '1' : '0');
  }, [show]);

  const onDismissClick = () => setShow(false);

  return show ? (
    <div className={styles.banner}>
      <div className="container">
        <div className="row align-items-center px-2 flex-nowrap">
          <div className="col-10 col-sm-11">
            <div className="container">
              <div className="row">
                <div className="d-none d-lg-block col pr-0">
                  <p className="pl-3 m-0 banner-text">DevExtreme Reactive component libraries are in maintenance support mode.</p>
                </div>
                <div className="d-none d-md-block col col-lg-auto px-0">
                  <img src={bannerSVG} alt="react" />
                </div>
                <div className="col-12 col-md-8 col-lg-6">
                  <p className="m-0 banner-text pl-3">
                    <div className="d-block d-lg-none">
                      DevExtreme&nbsp;Reactive component libraries are
                      <span className="nowrap"> in maintenance support mode.</span>
                    </div>
                    <span> For additional information in this regard, </span>
                    <span> please review the following readme on </span>
                    <span>GitHub: </span>
                    <a
                      href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="nowrap">DevExtreme Reactive Components - Maintenance Mode</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-1 d-flex justify-content-end">
            <button type="button" className={styles.button} aria-label="Close" onClick={onDismissClick}>
              <i className={styles.buttonIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Banner;
