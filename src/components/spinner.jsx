import React from 'react';  
import ReactDOM from 'react-dom';
import styles from './spinner.sass';

export default (props) => {
  return (
    <div className={styles.spinner}>
      <div className={`${styles.item} ${styles.bounce1}`}></div>
      <div className={`${styles.item} ${styles.bounce1}`}></div>
      <div className={`${styles.item} ${styles.bounce3}`}></div>
    </div>
  );
};
