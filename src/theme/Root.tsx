import React from 'react';
import FloatButton from '@site/src/components/ChatBot/FloatButton';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatButton />
    </>
  );
}
