import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from "openai";
import cors from 'cors';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 3080;

app.post("/", async (req, res) => {
        try {
            const prompt = req.body.message;
            console.log(prompt)
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 3000,
                top_p: 1,
                temperature: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.5,
            })

            res.json({
                bot: response.data.choices[0].text
            })
            console.log(response.data.choices[0].text)
        } catch (e) {
            console.log(e)
        }
    }
)
;

app.listen(port, () => {
    console.log('listening on port', port)
})