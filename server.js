require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.post('/submit', async (req, res) => {
    let { prompt } = req.body
    const resp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    let string = resp.data.choices[0].text
	res.status(200).json({
        hasil: string
    });
});

const PORT = 8080;
app.listen(PORT, '0.0.0.0', async () => {
	console.log('ChatGPT aplikasi running di port', PORT);
})