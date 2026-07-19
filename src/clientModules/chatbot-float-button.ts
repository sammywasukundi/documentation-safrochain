import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const root = document.createElement('div');
  root.id = 'chatbot-float-root';
  document.body.appendChild(root);
}
