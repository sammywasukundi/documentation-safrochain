import React from 'react';
import Layout from '@theme/Layout';
import ChatBot from '@site/src/components/ChatBot';

export default function ChatPage(): React.JSX.Element {
  return (
    <Layout
      title="Ask me"
      description="Safrochain assistant for quick help about the docs, testnet, RPC endpoints, and CLI usage"
    >
      <main className="container margin-vert--lg">
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Ask me</h1>
          <p style={{ color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem' }}>
            Get quick answers about Safrochain, the testnet, RPC endpoints, and the CLI.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ChatBot />
          </div>
        </div>
      </main>
    </Layout>
  );
}
