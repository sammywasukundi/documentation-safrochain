import React from 'react';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

function createMessage(role: ChatMessage['role'], text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    text,
  };
}

function getAssistantReply(text: string): string {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('testnet')) {
    return 'You can join the testnet by following the node guide and using the public testnet endpoints.';
  }

  if (normalized.includes('rpc') || normalized.includes('endpoint')) {
    return 'Use the public RPC and REST endpoints listed in the network docs for the current testnet.';
  }

  if (normalized.includes('cli') || normalized.includes('command')) {
    return 'Use the CLI reference for safrochaind commands such as query tx bank staking and governance.';
  }

  if (normalized.includes('node') || normalized.includes('validator')) {
    return 'For node or validator setup start with the run a node guide and the validator setup pages.';
  }

  return 'Ask about joining the testnet using the node guide network endpoints or CLI commands.';
}

export default function useChatBot() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    createMessage('assistant', 'Hello I can help with Safrochain basics node setup testnet access and CLI usage.'),
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  function resetChat() {
    setMessages([
      createMessage('assistant', 'Hello I can help with Safrochain basics node setup testnet access and CLI usage.'),
    ]);
    setInputValue('');
    setIsLoading(false);
  }

  function sendMessage(text: string) {
    if (!text.trim()) {
      return;
    }

    const userMessage = createMessage('user', text);
    const assistantMessage = createMessage('assistant', getAssistantReply(text));

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInputValue('');
    setIsLoading(false);
  }

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    resetChat,
    isLoading,
  };
}
