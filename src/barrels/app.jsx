import React from 'react';  
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './app.sass';

// components
import Button from '../components/button.jsx';
import Mailbox from './mailbox.jsx';
import {
  Drafts,
  Sent,
  Trash
} from '../barrels/skeletons.jsx';

class App extends React.Component {
  renderNavBar() {
    const mailboxesState = this.props.mailboxesState;

    const mailboxItems = mailboxesState.loaded ? mailboxesState.data.map((mailbox) => {
      return (
        <li key={`mailbox_${mailbox.id}`}><NavLink 
            className={styles.menuItem} 
            activeClassName={styles.menuItemActive} 
            to={`/${mailbox.type}`}>{mailbox.label}</NavLink></li>
      );
    }) : <div>Loading...</div>;

    return (
      <navbar className={`col ${styles.navbarContiner}`}>
        <ul className={styles.menu}>
          {mailboxItems}
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
    const routes = [];
    const mailboxesState = this.props.mailboxesState;

    mailboxesState.data.forEach((mailbox) => {
      routes.push(
        <Switch key={mailbox.id}>
          <Route exact path={`/${mailbox.type}/view/:emailId`} render={route => (
            <Mailbox mailboxId={mailbox.id} emailId={route.match.params.emailId}/>
          )}/>
          <Route path={`/${mailbox.type}/`} render={route => (<Mailbox mailboxId={mailbox.id}/>)} />
        </Switch>
      );
    });

    return (
      <div className={`col no-gutters`}>
        <Route exact path="/" component={Mailbox} />
        {routes}
      </div>
    );
  }

  render() {
    console.log('App.render');
    return (
      <div className="full-height">
        <header className={`container-fluid ${styles.headerContainer}`}>
          <div className={`row full-height`}>
            <div className={`col align-self-center full-height ${styles.logoContainer}`}>
              <span className={styles.textStart}>start</span><span className={styles.textMail}>mail</span>
            </div>
            <div className={`col align-self-center full-height`}>
              <h3 style={{display: 'inline-block'}} className={styles.title}>Mailbox</h3>
              <Button label="Compose" mode="blue" />
              <Button label="Refresh" />
            </div>
          </div>
        </header>
        <div className={styles.autoHeightContainer}>
          <div className={`container-fluid full-height`}>
            <Router>
              <div className={`row full-height`}>
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

const mapStateToProps = (state) => {
  return {
    mailboxesState: state.mailboxes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
