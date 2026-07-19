import React from 'react';
import ChatBot from './index';
import styles from './FloatButton.module.css';

export default function FloatButton(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.launcher}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask me"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.2 3.5a.75.75 0 0 1-1.23-.58V16h-.07A2.5 2.5 0 0 1 2 13.5v-8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.tooltip} role="tooltip">Ask me</span>
      </button>
      {open ? (
        <div className={styles.panel}>
          <ChatBot onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}