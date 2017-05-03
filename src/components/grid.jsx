import React from 'react';  
import ReactDOM from 'react-dom';

import styles from './grid.sass';

class Grid extends React.Component {
  renderItem(key, from, createdAt, subject) {
    return (
      <div className={`row ${styles.row}`} key={key}>
        <div className="col-10">
          <b className={styles.from}>{from}</b>
          <br/>
          <span className={styles.subject}>{subject}</span>
        </div>
        <div className={`col-2 ${styles.createdAt}`}>{createdAt}</div>
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
