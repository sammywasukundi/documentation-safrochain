import React from 'react';
import ChatBot from './index';
import styles from './FloatButton.module.css';

export default function FloatButton(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.launcher} type="button" onClick={() => setOpen(value => !value)}>
        {open ? 'Close' : 'Ask me'}
      </button>
      {open ? (
        <div className={styles.panel}>
          <ChatBot />
        </div>
      ) : null}
    </div>
  );
}
