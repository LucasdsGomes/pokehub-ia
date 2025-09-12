import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
});
async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free",
    messages: [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ],
    
  });

  console.log(completion.choices[0].message);
}

main();