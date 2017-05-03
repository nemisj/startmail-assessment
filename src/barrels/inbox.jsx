import React from 'react';  
import ReactDOM from 'react-dom';

import Grid from '../components/grid.jsx';

import styles from './inbox.sass';

class Inbox extends React.Component {
  renderEmailItem() {
    if (this.props.emailId) {
      return (
        <div>Email: {this.props.emailId}</div>
      );
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

    const viewer = this.renderEmailItem();
    let viewerPane = null;
    if (viewer) {
      viewerPane = <div className="col">{viewer}</div>
    }

    return (
      <div className={`container-fluid full-height`}>
        <div className="row full-height">
          <div className="col no-gutters">
            <Grid items={emails} onClick={this.onClick} />
          </div>
          {viewerPane}
        </div>
      </div>
    );
  }
};

export default Inbox;
