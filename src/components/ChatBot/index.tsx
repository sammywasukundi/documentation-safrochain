import React, { FormEvent } from 'react';
import useChatBot from './useChatBot';
import styles from './ChatBot.module.css';

const starterPrompts = [
  'How do I join testnet?',
  'Which RPC endpoint should I use?',
  'Show me the CLI commands',
];

function renderMessageText(text: string) {
  return text.split('\n').map((line, index) => (
    <p key={index} className={styles.messageText}>
      {line}
    </p>
  ));
}

type ChatBotProps = {
  onClose?: () => void;
};

export default function ChatBot({ onClose }: ChatBotProps): React.JSX.Element {
  const { messages, inputValue, setInputValue, sendMessage, resetChat, isLoading } = useChatBot();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
    }
  };

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Safrochain Assistant
          </div>
          <h2 className={styles.title}>Ask me anything</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.ghostButton} type="button" onClick={resetChat}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12a8 8 0 1 1 2.34 5.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 20v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New chat
          </button>
          <button className={styles.ghostIconButton} type="button" onClick={onClose} aria-label="Close chat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 && !isLoading ? (
          <div className={styles.emptyState}>
            <p>Ask about testnet, RPC endpoints, or the CLI — or tap a suggestion below.</p>
          </div>
        ) : null}

        {messages.map(message => (
          <div
            key={message.id}
            className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAssistant}`}
          >
            <div className={styles.messageBubble}>{renderMessageText(message.text)}</div>
          </div>
        ))}
        {isLoading ? (
          <div className={`${styles.message} ${styles.messageAssistant}`}>
            <div className={`${styles.messageBubble} ${styles.loadingBubble}`}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.footer}>
        <div className={styles.suggestions}>
          {starterPrompts.map(prompt => (
            <button
              key={prompt}
              type="button"
              className={styles.prompt}
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className={styles.formRow} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            placeholder="Ask about Safrochain"
            aria-label="Ask the Safrochain assistant"
          />
          <button className={styles.button} type="submit" aria-label="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12h16M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}