import React from 'react';  
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

import styles from './app.sass';

// components
import Button from './button.jsx';
import Inbox from '../barrels/inbox.jsx';
import {
  Drafts,
  Sent,
  Trash
} from '../barrels/skeletons.jsx';

class App extends React.Component {
  renderNavBar() {
    return (
      <navbar className={`col ${styles.navbarContiner}`}>
        <ul className={styles.menu}>
          <li><NavLink className={styles.menuItem} activeClassName={styles.menuItemActive} to="/inbox">Inbox</NavLink></li>
          <li><NavLink className={styles.menuItem} activeClassName={styles.menuItemActive} to="/drafts">Drafts</NavLink></li>
          <li><NavLink className={styles.menuItem} activeClassName={styles.menuItemActive} to="/sent">Sent</NavLink></li>
          <li><NavLink className={styles.menuItem} activeClassName={styles.menuItemActive} to="/trash">Trash</NavLink></li>
          <li><NavLink className={styles.menuItem} activeClassName={styles.menuItemActive} to="/spam">Spam</NavLink></li>
        </ul>
        <div className={styles.devider}/>
        <ul>
          <li className={styles.menuItem}>Contacts</li>
          <li className={styles.menuItem}>Settings</li>
          <li className={styles.menuItem}>Support</li>
        </ul>
      </navbar>
    );
  }

  renderMainContent() {
    return (
      <div className={`col ${styles.mainContainer}`}>
        <Route exact path="/" component={Inbox} />
        <Switch>
          <Route exact path="/inbox/view/:emailId" render={route => (
            <Inbox emailId={route.match.params.emailId}/>
          )}/>
          <Route path="/inbox/" component={Inbox} />
        </Switch>

        <Route path="/drafts" component={Drafts} />
        <Route path="/sent" component={Sent} />
        <Route path="/trash" component={Trash} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.fullHeght}>
        <header className={`container-fluid ${styles.headerContainer}`}>
          <div className={`row ${styles.fullHeght}`}>
            <div className={`col ${styles.logoContainer} align-self-center ${styles.fullHeght}`}>
              <span className={styles.textStart}>start</span><span className={styles.textMail}>mail</span>
            </div>
            <div className={`col align-self-center ${styles.fullHeght}`}>
              <h3 style={{display: 'inline-block'}} className={styles.title}>Inbox</h3>
              <Button label="Compose" mode="blue" />
              <Button label="Refresh" />
            </div>
          </div>
        </header>
        <div className={styles.autoHeightContainer}>
          <div className={`container-fluid ${styles.fullHeght}`}>
            <Router>
              <div className={`row ${styles.fullHeght}`}>
                {this.renderNavBar()}
                {this.renderMainContent()}
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
