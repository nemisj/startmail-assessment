import React from 'react';  
import ReactDOM from 'react-dom';

import styles from './button.sass';

export default (props) => {
  const mode = props.mode;

  let themeClass = styles[`${mode}Theme`];
  if (!themeClass) {
    themeClass = styles['grayTheme'];
  }

  return (
    <button className={`${styles.button} ${themeClass}`}>{props.label}</button>
  )
};
