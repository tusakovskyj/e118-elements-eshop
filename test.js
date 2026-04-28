const { google } = require('@ai-sdk/google');
const { streamText } = require('ai');

// Need dotenv if .env.local is used outside of next
require('dotenv').config({ path: '.env.local' });

async function main() {
  const result = await streamText({
    model: google('gemini-2.0-flash'),
    messages: [{ role: 'user', content: 'hello' }],
  });
  
  for await (const textPart of result.textStream) {
    console.log(textPart);
  }
}
main().catch(console.error);
