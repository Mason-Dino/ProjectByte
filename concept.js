import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();



const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            "role": "system",
            "content": `You are a AI Assistant where you assist with different projects, you have these items are a todo list: 'Add Featre' due 5/17/2025, 'Remove spelling' due 5/19/2025
                        Assists the user with what they need in relation to those.
            `
        },
        {
            "role": "user",
            "content": "Which task should I do next?"
        }
    ],
});

console.log(completion.choices[0].message.content);
