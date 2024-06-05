import { Metadata } from "next"
import client from '@/lib/openai'
export const metadata: Metadata = {
    title: "Chat"
}

export default async function Chat() {
    const messages = [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
        { role: "user", content: "Can you help me?" },
        { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
        { role: "user", content: "What's the best way to train a parrot?" },
      ];
    // const { choices } = await client.getCompletions(
    //     "gpt-35-turbo", // assumes a matching model deployment or model name
    //     ["鲁迅为什么暴打周树人"]);
    const events = await client.streamChatCompletions('gpt-35-turbo', messages, { maxTokens: 128 });
    for await (const event of events) {
      for (const choice of event.choices) {
        const delta = choice.delta?.content;
        if (delta !== undefined) {
          console.log(`Chatbot: ${delta}`);
        }
      }
    }
    return (
        <main className='bg-blue-500 p-10'>
            <h1>Chat</h1>
        </main>
    )
}
