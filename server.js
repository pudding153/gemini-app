const { history } = req.body;

const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      model: 'gemma-4-31b-it',
contents: history,
config: {
systemInstruction: "あなたは親切で優秀なAIアシスタントです。ユーザーとのここまでの会話の流れ（過去の文脈）をすべて把握した上で、自然に会話を続けてください。回答は必ず【最大300文字以内】で要約して簡潔に伝えてください。"
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
