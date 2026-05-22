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
    const { message } = req.body;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite', // 最新の軽量モデルを指定 [1]
      contents: message,
      // 300文字以内の要約を強制する指示を追加
      config: {
        systemInstruction: "あなたは親切なAIアシスタントです。ユーザーからの質問や会話に対して、必ず【最大300文字以内】で簡潔に要約して回答してください。300文字を超えてはいけません。"
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
