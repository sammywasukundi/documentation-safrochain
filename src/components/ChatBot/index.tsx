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

export default function ChatBot(): React.JSX.Element {
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
        <div>
          <div className={styles.badge}>Safrochain Assistant</div>
          <h2 className={styles.title}>Ask me</h2>
        </div>
        <button className={styles.secondaryButton} type="button" onClick={resetChat}>
          New chat
        </button>
      </div>

      <div className={styles.messages}>
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
        <form className={styles.formRow} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            placeholder="Ask about Safrochain"
            aria-label="Ask the Safrochain assistant"
          />
          <button className={styles.button} type="submit">
            Send
          </button>
        </form>

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
      </div>
    </section>
  );
}
