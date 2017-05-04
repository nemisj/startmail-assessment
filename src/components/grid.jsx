import React from 'react';  
import ReactDOM from 'react-dom';

import moment from 'moment';

import styles from './grid.sass';

class Grid extends React.Component {
  onClick(item) {
    const click = this.props.onClick;
    if (typeof click === 'function') {
      click(item);
    }
  }

  renderItem({ id, from, createdAt, subject }) {
    const key = id;

    const format = {
      sameDay: '[Today at] HH:mm',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    };

    const selectedClass = this.props.selected.indexOf(id) !== -1 ? styles.selected :  '';

    return (
      <div onClick={() => this.onClick(id)} className={`row ${styles.row} ${selectedClass}`} key={key}>
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
      children = this.props.items.map((item, index) => this.renderItem(item));
    }

    return (
      <div className={`container-fluid ${styles.grid}`}>
        {children}
      </div>
    );
  }
}

export default Grid;
