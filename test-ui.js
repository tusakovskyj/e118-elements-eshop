const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { useChat } = require('@ai-sdk/react');

function Test() {
  const chat = useChat({ api: '/api/chat' });
  console.log('KEYS:', Object.keys(chat));
  return React.createElement('div', null, 'hello');
}

renderToStaticMarkup(React.createElement(Test));
