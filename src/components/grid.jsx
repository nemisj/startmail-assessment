import React from 'react';  
import ReactDOM from 'react-dom';

import moment from 'moment';

import styles from './grid.sass';

class Grid extends React.Component {
  renderItem(key, from, createdAt, subject) {
    const format = {
      sameDay: '[Today at] HH:mm',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    };

    return (
      <div className={`row ${styles.row}`} key={key}>
        <div className="col-8">
          <b className={styles.from}>{from}</b>
          <br/>
          <span className={styles.subject}>{subject}</span>
        </div>
        <div className={`col-4 ${styles.createdAt}`}>{moment(createdAt).calendar(null, format)}</div>
      </div>
    );
  }

  render() {
    let children = null;
    if (Array.isArray(this.props.items)) {
      children = this.props.items.map((item, index) => this.renderItem(index, item.from, item.createdAt, item.subject));
    }

    return (
      <div className={`container-fluid ${styles.grid}`}>
        {children}
      </div>
    );
  }
}

export default Grid;
