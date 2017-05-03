import React from 'react';  
import ReactDOM from 'react-dom';

import Grid from '../components/grid.jsx';

import styles from './inbox.sass';

class Inbox extends React.Component {
  renderEmailItem() {
    if (this.props.emailId) {
      return <div>Email: {this.props.emailId}</div>
    }
    return null;
  }

  render() {
    const emails = [
      { createdAt: new Date(2012, 10,10).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
      { createdAt: new Date(2017, 4, 2).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
      { createdAt: new Date(2017, 4, 3).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
      { createdAt: new Date(2017, 3, 1).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
      { createdAt: new Date().getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' }
    ];

    return (
      <div className={styles.inbox}>
        <Grid items={emails} onClick={this.onClick} />
        {this.renderEmailItem()}
      </div>
    );
  }
};

export default Inbox;
