import React from 'react';  
import ReactDOM from 'react-dom';

import styles from './app.sass';

export default () => {
  return (
    <div className={styles.fullHeght}>
      <header className={`container-fluid ${styles.headerContainer}`}>
        <div className={`row ${styles.fullHeght}`}>
          <div className={`col ${styles.logoContainer} align-self-center ${styles.fullHeght}`}>
            <span className={styles.textStart}>start</span><span className={styles.textMail}>mail</span>
          </div>
          <div className={`col align-self-center ${styles.fullHeght}`}>
            <h3 className={styles.title}>Inbox</h3>
          </div>
        </div>
      </header>
      <div className={styles.autoHeightContainer}>
        <div className={`container-fluid ${styles.fullHeght}`}>
          <div className={`row ${styles.fullHeght}`}>
            <navbar className={`col ${styles.navbarContiner}`}>
              Navbar
            </navbar>
            <div className={`col ${styles.mainContainer}`}>
              Main content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
