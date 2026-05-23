import express from 'express';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { history } = req.body;

    const searchTool = { googleSearch: {} };

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite', 
      contents: history,
      config: {
        systemInstruction: "あなたは親切で優秀なAIアシスタントです。ユーザーとのここまでの会話の流れ（過去の文脈）をすべて把握した上で、自然に会話を続けてください。回答は必ず【最大300文字以内】で要約して簡潔に伝えてください。",
        tools: [searchTool]
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error Detail:", error);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
